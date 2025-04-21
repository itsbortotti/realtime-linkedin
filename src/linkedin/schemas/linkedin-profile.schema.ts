import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'linkedinprofiles' })  // Add this line to specify collection name
export class LinkedinProfile extends Document {
  @Prop({ required: true, unique: true })
  profileId: string;

  @Prop()
  name: string;

  @Prop()
  headline: string;

  @Prop()
  summary: string;

  @Prop()
  profilePicture: string;

  @Prop()
  profileURL: string;

  @Prop()
  location: string;

  @Prop()
  currentPosition: string;

  @Prop([String])
  skills: string[];

  @Prop([String])
  matchedSkills: string[];

  @Prop()
  score: number;

  @Prop()
  isQualified: boolean;
}

export const LinkedinProfileSchema = SchemaFactory.createForClass(LinkedinProfile);