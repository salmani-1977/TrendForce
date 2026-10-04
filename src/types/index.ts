export type TabType = 'home' | 'commission' | 'health' | 'exam' | 'more';

export interface UserProfile {
  name: string;
  memberType: '회원' | '위촉회원';
  inviteCode: string;
  missedCommissionCount: number;
  missedCommissionAmount: number;
  totalContractsCount: number;
  monthlyPremium: number;
}

export interface InsuranceContract {
  id: string;
  companyName: string;
  productName: string;
  commissionAmount: number;
  isContractHolder: boolean;
  category: 'recent' | 'holder' | 'non_holder';
  dDayBadge?: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  registeredDate: string;
}

export interface TopProduct {
  id: string;
  companyName: string;
  productName: string;
  rate: string;
}

export interface TreatmentCost {
  diseaseCategory: string;
  treatmentName: string;
  estimatedCost: string;
}

export interface CoverageAnalysis {
  category: string;
  coveredAmount: number;
  targetAmount: number;
  percentage: number;
  color: string;
}

export interface NotificationItem {
  id: string;
  category: '공지사항' | '추천인' | '계약' | '조직관리';
  title: string;
  content: string;
  timeAgo: string;
  isRead: boolean;
}
