import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  ReputationRecord,
  CertificateNft,
  BadgeNft,
  EscrowPayout,
} from './interfaces/contracts.interface';

@Injectable()
export class ContractsService {
  private readonly reputations = new Map<string, ReputationRecord>();
  private readonly certificates = new Map<string, CertificateNft>();
  private readonly badges = new Map<string, BadgeNft>();
  private readonly payouts = new Map<string, EscrowPayout>();

  getReputation(userId: string) {
    return this.reputations.get(userId) ?? { userId, score: 0, level: 1, lastUpdated: new Date() };
  }

  updateReputation(userId: string, score: number) {
    const record: ReputationRecord = {
      userId, score,
      level: Math.floor(score / 100) + 1,
      lastUpdated: new Date(),
    };
    this.reputations.set(userId, record);
    return { success: true, data: record };
  }

  issueCertificate(userId: string, courseId: string) {
    const cert: CertificateNft = {
      id: `cert_${uuidv4()}`, userId, courseId, issuedAt: new Date(),
    };
    this.certificates.set(cert.id, cert);
    return { success: true, data: cert };
  }

  getCertificate(id: string) {
    const cert = this.certificates.get(id);
    if (!cert) throw new NotFoundException('Certificate not found');
    return cert;
  }

  listCertificates(userId: string) {
    return Array.from(this.certificates.values()).filter((c) => c.userId === userId);
  }

  issueBadge(userId: string, badgeType: string) {
    const badge: BadgeNft = {
      id: `badge_${uuidv4()}`, userId, badgeType, issuedAt: new Date(),
    };
    this.badges.set(badge.id, badge);
    return { success: true, data: badge };
  }

  getBadge(id: string) {
    const badge = this.badges.get(id);
    if (!badge) throw new NotFoundException('Badge not found');
    return badge;
  }

  listBadges(userId: string) {
    return Array.from(this.badges.values()).filter((b) => b.userId === userId);
  }

  createPayout(userId: string, amount: number, currency: string) {
    const payout: EscrowPayout = {
      id: `payout_${uuidv4()}`, userId, amount, currency,
      status: 'pending', createdAt: new Date(),
    };
    this.payouts.set(payout.id, payout);
    return { success: true, data: payout };
  }

  getPayout(id: string) {
    const payout = this.payouts.get(id);
    if (!payout) throw new NotFoundException('Payout not found');
    return payout;
  }

  releasePayout(id: string) {
    const payout = this.payouts.get(id);
    if (!payout) throw new NotFoundException('Payout not found');
    payout.status = 'completed';
    return { success: true, data: payout };
  }
}
