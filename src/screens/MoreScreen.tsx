import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { MOCK_USER_PROFILE } from '../constants/mockData';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    title: '내 정보',
    items: [
      { id: 'profile', icon: '🪪', label: '프로필 관리' },
      { id: 'org', icon: '📁', label: '조직 관리' },
      { id: 'invite_reg', icon: '🎒', label: '초대 코드 등록' },
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
      { id: 'life_rates', icon: '☂️', label: '생명보험 상품 수수료율' },
      { id: 'nonlife_rates', icon: '☂️', label: '손해보험 상품 수수료율' },
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

export const MoreScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
      <TouchableOpacity style={styles.kakaoBanner} activeOpacity={0.85}>
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
              <TouchableOpacity key={item.id} style={styles.menuRowItem} activeOpacity={0.7}>
                <View style={styles.menuLeft}>
                  <Text style={styles.menuIconEmoji}>{item.icon}</Text>
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
