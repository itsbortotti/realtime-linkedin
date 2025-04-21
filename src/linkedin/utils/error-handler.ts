import { HttpException, HttpStatus } from '@nestjs/common';

export class LinkedinErrorHandler {
  static handleApiError(error: any) {
    console.error('Erro na busca:', {
      mensagem: error.message,
      dados: error.response?.data
    });

    return {
      message: 'Erro na busca',
      error: error.message,
      details: error.response?.data
    };
  }
}