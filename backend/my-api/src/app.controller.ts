import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-votes/:address')
  async getVotes(@Param('address') address: string) {
    return {result: await this.appService.getVotes(address)};
  }

  @Post('mint-tokens/:address')
  async mintTokens(@Param('address') address: string) {
    this.appService.mintToken(address)
  }

  @Post('delegate/:address')
  async delegate(@Query('address') address: string) {
    this.appService.delegate(address);
  }

}
