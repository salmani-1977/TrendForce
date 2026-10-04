import { UserProfile, InsuranceContract, MemberProfile, TopProduct, TreatmentCost, CoverageAnalysis, NotificationItem } from '../types';

export const MOCK_USER_PROFILE: UserProfile = {
  name: '홍길동',
  memberType: '회원',
  inviteCode: '01012345678',
  missedCommissionCount: 6,
  missedCommissionAmount: 5840000,
  totalContractsCount: 6,
  monthlyPremium: 315000,
};

export const MOCK_HOME_CONTRACTS: InsuranceContract[] = [
  {
    id: 'c1',
    companyName: '신한라이프',
    productName: '무배당 알파Plus보장보험',
    commissionAmount: 0,
    isContractHolder: true,
    category: 'holder',
  },
  {
    id: 'c2',
    companyName: '메리츠화재',
    productName: '메리츠화재 Hicar 개인용',
    commissionAmount: 0,
    isContractHolder: true,
    category: 'holder',
  },
  {
    id: 'c3',
    companyName: '현대해상',
    productName: '종신보험 세븐 Plus',
    commissionAmount: 0,
    isContractHolder: true,
    category: 'holder',
  },
];

export const MOCK_RECRUITED_MEMBERS: MemberProfile[] = [
  {
    id: 'm1',
    name: '이안',
    registeredDate: '2026.09.28',
  },
];

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
  {
    id: 'tp1',
    companyName: '신한라이프',
    productName: '무배당 알파Plus보장보험',
    rate: '2,028%',
  },
  {
    id: 'tp2',
    companyName: '현대해상',
    productName: '종신보험 세븐 Plus',
    rate: '2,024%',
  },
  {
    id: 'tp3',
    companyName: '메리츠화재',
    productName: 'Hicar 개인용',
    rate: '2,021%',
  },
];

export const MOCK_COMMISSION_CONTRACTS: InsuranceContract[] = [
  // Recent
  {
    id: 'cc1',
    companyName: 'KB손해보험',
    productName: '무배당 트렌드플러스 통합종신보험',
    commissionAmount: 1480000,
    isContractHolder: true,
    category: 'recent',
    dDayBadge: 'D-90',
  },
  // Contract Holder
  {
    id: 'cc2',
    companyName: '교보생명',
    productName: '무배당 스마트변액연금보험',
    commissionAmount: 1350000,
    isContractHolder: true,
    category: 'holder',
  },
  {
    id: 'cc3',
    companyName: '신한라이프',
    productName: '무배당 트렌드암보장보험',
    commissionAmount: 950000,
    isContractHolder: true,
    category: 'holder',
  },
  {
    id: 'cc4',
    companyName: 'DB손해보험',
    productName: '(무)트렌드 든든 어린이보험',
    commissionAmount: 780000,
    isContractHolder: true,
    category: 'holder',
  },
  // Non Contract Holder
  {
    id: 'cc5',
    companyName: '삼성화재',
    productName: '무배당 프리미엄 건강보험',
    commissionAmount: 1280000,
    isContractHolder: false,
    category: 'non_holder',
  },
];

export const MOCK_TREATMENT_COSTS: TreatmentCost[] = [
  { diseaseCategory: '심장질환', treatmentName: '관상동맥 성형술 및 스텐트', estimatedCost: '1,580 만원' },
  { diseaseCategory: '뇌혈관질환', treatmentName: '뇌혈관 혈전제거 수술', estimatedCost: '2,650 만원' },
  { diseaseCategory: '만성신부전', treatmentName: '인공신장 혈액투석', estimatedCost: '3,400 만원' },
];

export const MOCK_COVERAGE_ANALYSIS: CoverageAnalysis[] = [
  {
    category: '심장질환 주요 치료비',
    coveredAmount: 0,
    targetAmount: 6000,
    percentage: 0,
    color: '#CBD5E1',
  },
  {
    category: '급성심근경색 진단비',
    coveredAmount: 2000,
    targetAmount: 6000,
    percentage: 33,
    color: '#FF6B35',
  },
  {
    category: '허혈성심장질환 진단비',
    coveredAmount: 6000,
    targetAmount: 6000,
    percentage: 100,
    color: '#10B981',
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: '공지사항',
    title: '트렌드포스 앱 업데이트 안내',
    content: '이번 업데이트에서 오프라인 회원 초대 및 수수료 실시간 시뮬레이터가 추가되었어요.',
    timeAgo: '1시간 전',
    isRead: false,
  },
  {
    id: 'n2',
    category: '추천인',
    title: '추천인 시험 합격 알림',
    content: '내가 추천한 홍길동님이 생명보험 설계사 시험에 합격했어요. 위촉 후 승급 예정이에요.',
    timeAgo: '1시간 전',
    isRead: false,
  },
  {
    id: 'n3',
    category: '계약',
    title: '수수료 정산 완료',
    content: '2026년 04월 수수료 345,000원이 정산되었어요. 내역은 수수료 명세표에서 확인할 수 있어요.',
    timeAgo: '2시간 전',
    isRead: true,
  },
  {
    id: 'n4',
    category: '공지사항',
    title: '시험 접수 마감 임박',
    content: '2026년 6월 생명보험 설계사 시험 접수가 3일 후 마감돼요. 아직 접수 전이라면 서둘러주세요.',
    timeAgo: '3시간 전',
    isRead: true,
  },
  {
    id: 'n5',
    category: '공지사항',
    title: '개인정보 처리방침 변경 안내',
    content: '2026년 6월 1일부터 일부 항목이 변경됩니다. 앱 내 동의 후 계속 이용하실 수 있어요.',
    timeAgo: '3시간 전',
    isRead: true,
  },
];
