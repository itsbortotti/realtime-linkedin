import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';  // Add Types import
import { LinkedinProfile } from './schemas/linkedin-profile.schema';
import { LinkedinErrorHandler } from './utils/error-handler';
import { LinkedinLogger } from './utils/logger.service';
import { ProfileValidator } from './utils/profile-validator';

@Injectable()
@ApiTags('LinkedIn')
export class LinkedinService {
  constructor(
    @InjectModel(LinkedinProfile.name)
    private linkedinProfileModel: Model<LinkedinProfile>,
    private readonly logger: LinkedinLogger  // Add logger injection
  ) {
    console.log('MongoDB Collection:', this.linkedinProfileModel.collection.name);
  }

  private currentPosition = 0;
  private readonly apiKey = '69cab0ce47mshd4faf9e91648d26p1e0d04jsn5dcd1c3afd22';

  @ApiOperation({ summary: 'Search for developers on LinkedIn' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of developer profiles',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        total: { type: 'number' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              profileId: { type: 'string' },
              name: { type: 'string' },
              headline: { type: 'string' },
              summary: { type: 'string' },
              profilePicture: { type: 'string' },
              profileURL: { type: 'string' },
              detailedInfo: {
                type: 'object',
                properties: {
                  skills: { type: 'array', items: { type: 'string' } },
                  location: { type: 'string' },
                  currentPosition: { type: 'string' },
                  languages: { type: 'array', items: { type: 'string' } }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async searchDevelopers() {
    try {
      this.logger.logSearchStart(this.currentPosition);
      
      const searchResponse = await axios.get('https://linkedin-data-api.p.rapidapi.com/search-people', {
        params: {
          keyword: 'desenvolvedor',
          location: 'São Paulo',
          offset: this.currentPosition,
          records: 5,
          page_size: 5
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'linkedin-data-api.p.rapidapi.com'
        }
      });

      console.log('MongoDB Connection:', process.env.MONGODB_URI);
      console.log('Profile Data:', JSON.stringify(searchResponse.data?.data?.items?.[0], null, 2));

      if (!searchResponse.data?.data?.items) {
        console.log('No items found in response');
        return { message: 'Nenhum perfil encontrado', total: 0, data: [] };
      }

      const profile = searchResponse.data?.data?.items?.[0];
      if (!profile) {
        console.log('No profile found in items');
        return { message: 'Nenhum perfil encontrado', total: 0, data: [] };
      }

      console.log('Checking for existing profile:', profile.username);
      const existingProfile = await this.linkedinProfileModel.findOne({ 
        profileId: profile.username 
      });

      if (existingProfile) {
        console.log('Found existing profile');
        return {
          message: 'Perfil já cadastrado',
          total: 1,
          data: [existingProfile]
        };
      }

      console.log('Creating new profile');
      const validation = ProfileValidator.validateProfile(profile);
      
      try {
        const profileData = {
          profileId: profile.username,
          name: profile.fullName,
          headline: profile.headline,
          summary: profile.summary,
          profilePicture: profile.profilePicture,
          profileURL: profile.profileURL,
          location: profile.location || '',
          currentPosition: profile.headline || '',
          skills: [],
          matchedSkills: validation.matchedSkills,
          score: validation.score,
          isQualified: validation.isQualified
        };

        console.log('Attempting to save to collection:', this.linkedinProfileModel.collection.name);
        const savedProfile = await this.linkedinProfileModel.create(profileData);
        console.log('Profile saved successfully:', savedProfile._id);

        return {
          message: 'Busca finalizada e perfil salvo',
          total: 1,
          data: [savedProfile]
        };
      } catch (dbError) {
        console.error('MongoDB Error:', dbError);
        throw dbError;
      }

    } catch (error) {
      console.error('Service error:', error);
      return LinkedinErrorHandler.handleApiError(error);
    }
  }
}