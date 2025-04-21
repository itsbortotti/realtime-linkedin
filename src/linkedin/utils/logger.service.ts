import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class LinkedinLogger {
  logSearchStart(position: number) {
    console.log('Iniciando busca por desenvolvedores...');
    console.log(`Buscando perfil na posição: ${position}`);
  }

  logApiResponse(data: any) {
    console.log('API Response:', JSON.stringify(data, null, 2));
  }

  logExistingProfile(id: Types.ObjectId | string) {
    console.log('Perfil já existe no banco:', id.toString());
  }

  logProfileSaved(id: Types.ObjectId | string) {
    console.log('Perfil salvo no MongoDB:', id.toString());
  }
}