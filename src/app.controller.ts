import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'LinkedIn Developer Search API',
      availableEndpoints: {
        developers: '/linkedin/developers'
      }
    };
  }
}
