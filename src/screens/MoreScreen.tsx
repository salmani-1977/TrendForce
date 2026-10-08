import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { MOCK_USER_PROFILE } from '../constants/mockData';
import { ProfileManagementScreen } from './ProfileManagementScreen';
import { OrganizationManagementScreen } from './OrganizationManagementScreen';
import { InviteCodeStubScreen } from './InviteCodeStubScreen';
import { LifeInsuranceCommissionScreen } from './LifeInsuranceCommissionScreen';
import { NonLifeInsuranceCommissionScreen } from './NonLifeInsuranceCommissionScreen';

export type MoreSubPageType = 'main' | 'profile' | 'organization' | 'invite_code' | 'life_rates' | 'nonlife_rates';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  subPage?: MoreSubPageType;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    title: '내 정보',
    items: [
      { id: 'profile', icon: '🪪', label: '프로필 관리', subPage: 'profile' },
      { id: 'org', icon: '📁', label: '조직 관리', subPage: 'organization' },
      { id: 'invite_reg', icon: '🎒', label: '초대 코드 등록', subPage: 'invite_code' },
      { id: 'invite_share', icon: '🎒', label: '초대 코드 공유' },
      { id: 'contracts', icon: '📦', label: '계약 내역' },
      { id: 'commissions', icon: '💵', label: '수수료 내역' },
    ],
  },
  {
    title: '시험 관리',
    items: [
      { id: 'exam_apply', icon: '📅', label: '시험 접수하기' },
      { id: 'exam_history', icon: '📋', label: '시험 내역' },
    ],
  },
  {
    title: '보험 상품',
    items: [
      { id: 'life_rates', icon: '☂️', label: '생명보험 상품 수수료율', subPage: 'life_rates' },
      { id: 'nonlife_rates', icon: '☂️', label: '손해보험 상품 수수료율', subPage: 'nonlife_rates' },
    ],
  },
  {
    title: '앱 정보',
    items: [
      { id: 'notice', icon: '📣', label: '공지사항' },
      { id: 'cs', icon: '📞', label: '고객센터' },
    ],
  },
];

interface MoreScreenProps {
  initialSubPage?: MoreSubPageType;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ initialSubPage = 'main' }) => {
  const [currentSubPage, setCurrentSubPage] = useState<MoreSubPageType>(initialSubPage);

  useEffect(() => {
    if (initialSubPage) {
      setCurrentSubPage(initialSubPage);
    }

    if (Platform.OS === 'web') {
      const styleId = 'icon-micro-animations-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.18); }
          }
          @keyframes shieldFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.2s infinite ease-in-out;
            transform-origin: center;
          }
          .animate-shield-float {
            animation: shieldFloat 2.0s infinite ease-in-out;
            transform-origin: center;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [initialSubPage]);

  const handleKakaoShare = () => {
    if (Platform.OS === 'web') {
      window.alert(`[스탭] 카카오톡 공유 시트\n조대 코드: ${MOCK_USER_PROFILE.inviteCode}`);
    } else {
      Alert.alert('[스탭] 카카오톡 공유 시트', `조대 코드: ${MOCK_USER_PROFILE.inviteCode}`);
    }
  };

  const handleCustomerService = () => {
    if (Platform.OS === 'web') {
      window.alert('[스탭] 채널톡 상담 채팅');
    } else {
      Alert.alert('[스탭]', '채널톡 상담 채팅');
    }
  };

  // [2단계 공정] 서브페이지 라우팅 — 클릭 시 해당 서브페이지 컴포넌트를 렌더링하고
  // 각 서브페이지 내부의 onBack 콜백으로 'main'으로 복귀한다.
  if (currentSubPage === 'profile') {
    return <ProfileManagementScreen onBack={() => setCurrentSubPage('main')} />;
  }
  if (currentSubPage === 'organization') {
    return <OrganizationManagementScreen onBack={() => setCurrentSubPage('main')} />;
  }
  if (currentSubPage === 'invite_code') {
    return <InviteCodeStubScreen onBack={() => setCurrentSubPage('main')} />;
  }
  if (currentSubPage === 'life_rates') {
    return <LifeInsuranceCommissionScreen onBack={() => setCurrentSubPage('main')} />;
  }
  if (currentSubPage === 'nonlife_rates') {
    return <NonLifeInsuranceCommissionScreen onBack={() => setCurrentSubPage('main')} />;
  }

  // [공정 2] 아이콘 렌더링 — 생명보험(하트 펄스 💙), 손해보험(안전 방패 둥둥 🛡️) 마이크로 애니메이션 연동
  const renderMenuIcon = (item: MenuItem) => {
    if (item.id === 'life_rates') {
      if (Platform.OS === 'web') {
        return (
          <div className="animate-heartbeat" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#EBF3FF" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#2563EB" />
            </svg>
          </div>
        );
      }
      return <Text style={{ fontSize: 20 }}>💙</Text>;
    }

    if (item.id === 'nonlife_rates') {
      if (Platform.OS === 'web') {
        return (
          <div className="animate-shield-float" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#FEE2E2" />
              <path d="M12 2L4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" fill="#DC2626" />
            </svg>
          </div>
        );
      }
      return <Text style={{ fontSize: 20 }}>🛡️</Text>;
    }

    return <Text style={styles.menuIconEmoji}>{item.icon}</Text>;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Profile Bar */}
      <View style={styles.profileContainer}>
        <View style={styles.nameGroup}>
          <Text style={styles.userNameText}>{MOCK_USER_PROFILE.name}님</Text>
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>{MOCK_USER_PROFILE.memberType}</Text>
          </View>
        </View>
      </View>

      {/* KakaoTalk Invitation Banner */}
      <TouchableOpacity 
        style={styles.kakaoBanner} 
        activeOpacity={0.85}
        onPress={handleKakaoShare}
      >
        <View style={styles.kakaoTextGroup}>
          <Text style={styles.kakaoSubText}>카카오톡으로 간편하게</Text>
          <Text style={styles.kakaoMainText}>초대 코드 바로 공유하기</Text>
        </View>
        <View style={styles.talkCircle}>
          <Text style={styles.talkText}>TALK</Text>
        </View>
      </TouchableOpacity>

      {/* 4 Menu Groups (12 Submenus) */}
      {MENU_GROUPS.map((group, gIdx) => (
        <View key={gIdx} style={styles.groupContainer}>
          <Text style={styles.groupTitleText}>{group.title}</Text>
          <View style={styles.itemList}>
            {group.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuRowItem}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.subPage) {
                    setCurrentSubPage(item.subPage);
                  } else if (item.id === 'cs') {
                    handleCustomerService();
                  } else if (item.id === 'invite_share') {
                    handleKakaoShare();
                  }
                }}
              >
                <View style={styles.menuLeft}>
                  {renderMenuIcon(item)}
                  <Text style={styles.menuLabelText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Business Information Footer */}
      <View style={styles.businessFooter}>
        <Text style={styles.companyNameText}>(주)트렌드포스 (TrendForce Inc.)</Text>
        <Text style={styles.footerDetailText}>대표이사 홍길동</Text>
        <Text style={styles.footerDetailText}>고객센터 1234-5678</Text>
        <Text style={styles.footerDetailText}>사업자등록번호 123-456-789</Text>
        <Text style={styles.footerDetailText}>통신판매업신고번호 123-456-789</Text>
        <Text style={styles.footerDetailText}>주소 서울특별시 강남구 무슨동</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 16,
    paddingBottom: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  nameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userNameText: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  memberBadge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.bold,
  },
  kakaoBanner: {
    height: 72,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  kakaoTextGroup: {
    gap: 2,
  },
  kakaoSubText: {
    fontSize: Typography.size.xs,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  kakaoMainText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.heavy,
    color: Colors.textWhite,
  },
  talkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: {
    fontSize: 12,
    fontWeight: Typography.weight.heavy,
    color: '#3C1E1E',
  },
  groupContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  groupTitleText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  itemList: {
    gap: 4,
  },
  menuRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconEmoji: {
    fontSize: 20,
  },
  menuLabelText: {
    fontSize: Typography.size.base,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  businessFooter: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    gap: 3,
  },
  companyNameText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  footerDetailText: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
});
