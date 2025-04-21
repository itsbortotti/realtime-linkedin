import { Controller, Get } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Get('developers')
  async searchDevelopers() {
    return this.linkedinService.searchDevelopers();
  }
}
