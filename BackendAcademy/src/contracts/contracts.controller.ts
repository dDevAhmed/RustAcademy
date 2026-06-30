import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('reputation/:userId')
  getReputation(@Param('userId') userId: string) {
    return this.contractsService.getReputation(userId);
  }

  @Post('reputation/:userId')
  updateReputation(
    @Param('userId') userId: string,
    @Body('score') score: number,
  ) {
    return this.contractsService.updateReputation(userId, score);
  }

  @Post('certificates/issue')
  issueCertificate(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.contractsService.issueCertificate(userId, courseId);
  }

  @Get('certificates/:id')
  getCertificate(@Param('id') id: string) {
    return this.contractsService.getCertificate(id);
  }

  @Get('certificates/user/:userId')
  listCertificates(@Param('userId') userId: string) {
    return this.contractsService.listCertificates(userId);
  }

  @Post('badges/issue')
  issueBadge(
    @Body('userId') userId: string,
    @Body('badgeType') badgeType: string,
  ) {
    return this.contractsService.issueBadge(userId, badgeType);
  }

  @Get('badges/:id')
  getBadge(@Param('id') id: string) {
    return this.contractsService.getBadge(id);
  }

  @Get('badges/user/:userId')
  listBadges(@Param('userId') userId: string) {
    return this.contractsService.listBadges(userId);
  }

  @Post('payouts/create')
  createPayout(
    @Body('userId') userId: string,
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ) {
    return this.contractsService.createPayout(userId, amount, currency);
  }

  @Get('payouts/:id')
  getPayout(@Param('id') id: string) {
    return this.contractsService.getPayout(id);
  }

  @Post('payouts/:id/release')
  releasePayout(@Param('id') id: string) {
    return this.contractsService.releasePayout(id);
  }
}
