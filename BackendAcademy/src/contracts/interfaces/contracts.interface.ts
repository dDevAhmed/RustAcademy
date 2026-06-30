export interface ReputationRecord {
  userId: string;
  score: number;
  level: number;
  lastUpdated: Date;
}

export interface CertificateNft {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  txHash?: string;
}

export interface BadgeNft {
  id: string;
  userId: string;
  badgeType: string;
  issuedAt: Date;
  txHash?: string;
}

export interface EscrowPayout {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}
