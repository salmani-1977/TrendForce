import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography } from '../constants/colors';

interface OrganizationManagementScreenProps {
  onBack: () => void;
}

type MemberRole = '위촉 회원' | '회원' | '팀장';
type TabType = '전체' | '회원' | '위촉 회원' | '팀장';

interface OrgMember {
  id: string;
  name: string;
  role: MemberRole;
}

const ORGANIZATION_MEMBERS: OrgMember[] = [
  { id: '1', name: '강태양', role: '위촉 회원' },
  { id: '2', name: '김민준', role: '회원' },
  { id: '3', name: '나경수', role: '위촉 회원' },
  { id: '4', name: '류하은', role: '회원' },
  { id: '5', name: '문성호', role: '위촉 회원' },
  { id: '6', name: '박지연', role: '회원' },
  { id: '7', name: '서동현', role: '회원' },
  { id: '8', name: '오승재', role: '위촉 회원' },
  { id: '9', name: '임채원', role: '회원' },
  { id: '10', name: '정다혜', role: '위촉 회원' },
  { id: '11', name: '최영팀장', role: '팀장' },
  { id: '12', name: '한준팀장', role: '팀장' },
];

const TABS: TabType[] = ['전체', '회원', '위촉 회원', '팀장'];

const ROLE_BADGE_COLOR: Record<MemberRole, string> = {
  '위촉 회원': Colors.primary,
  '회원': '#94A3B8',
  '팀장': '#F59E0B',
};

export const OrganizationManagementScreen: React.FC<OrganizationManagementScreenProps> = ({ onBack }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('전체');

  const filteredMembers = ORGANIZATION_MEMBERS.filter((m) => {
    if (selectedTab === '전체') return true;
    return m.role === selectedTab;
  });

  return (
    <View style={styles.wrapper}>
      {/* Header - Back Button Only */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* KakaoTalk Banner */}
        <TouchableOpacity style={styles.kakaoBanner} activeOpacity={0.85}>
          <View style={styles.kakaoTextGroup}>
            <Text style={styles.kakaoSubText}>카카오톡으로 간편하게</Text>
            <Text style={styles.kakaoMainText}>초대 코드 바로 공유하기</Text>
          </View>
          <View style={styles.talkBadge}>
            <Text style={styles.talkText}>TALK</Text>
          </View>
        </TouchableOpacity>

        {/* 4-Tab Filter Bar */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {selectedTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Row */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryCountText}>총 {filteredMembers.length}</Text>
          <View style={styles.sortRow}>
            <Text style={styles.sortText}>가나다순</Text>
            <Text style={styles.sortDivider}>  </Text>
            <Text style={[styles.sortText, styles.sortActive]}>업데이트순</Text>
          </View>
        </View>

        {/* Member List */}
        {filteredMembers.map((member) => (
          <View key={member.id} style={styles.memberRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <Text style={styles.memberName}>{member.name}</Text>
            <View style={[styles.roleBadge, { backgroundColor: ROLE_BADGE_COLOR[member.role] }]}>
              <Text style={styles.roleBadgeText}>{member.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontWeight: '300',
    lineHeight: 32,
  },
  headerRight: {
    width: 36,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  kakaoBanner: {
    height: 72,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  kakaoTextGroup: {
    gap: 2,
  },
  kakaoSubText: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.85)',
  },
  kakaoMainText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.heavy,
    color: Colors.textWhite,
  },
  talkBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: {
    fontSize: 11,
    fontWeight: Typography.weight.heavy,
    color: '#3C1E1E',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    paddingHorizontal: 16,
  },
  tabItem: {
    marginRight: 24,
    paddingVertical: 14,
    position: 'relative',
    alignItems: 'center',
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.weight.bold,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.textPrimary,
    borderRadius: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  summaryCountText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  sortDivider: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  sortActive: {
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 20,
  },
  memberName: {
    flex: 1,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.medium,
    color: Colors.textPrimary,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textWhite,
  },
});
