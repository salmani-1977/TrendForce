import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Clipboard, Alert } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { MOCK_USER_PROFILE } from '../constants/mockData';

interface DrawerMenuScreenProps {
  onClose: () => void;
}

export const DrawerMenuScreen: React.FC<DrawerMenuScreenProps> = ({ onClose }) => {
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const handleCopyInviteCode = () => {
    Clipboard.setString(MOCK_USER_PROFILE.inviteCode);
    setCopiedToast(true);
    setTimeout(() => {
      setCopiedToast(false);
    }, 2000);
  };

  return (
    <View style={styles.overlayContainer}>
      {/* Semi-transparent Backdrop click to close */}
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose} 
      />

      {/* Slide Drawer Content Container */}
      <SafeAreaView style={styles.drawerContent}>
        <View style={styles.innerContainer}>
          {/* Header User Profile Row */}
          <TouchableOpacity style={styles.userHeaderRow} activeOpacity={0.7}>
            <View style={styles.userInfoLeft}>
              <Text style={styles.userNameText}>{MOCK_USER_PROFILE.name}님</Text>
              <View style={styles.appointedBadge}>
                <Text style={styles.appointedBadgeText}>위촉회원</Text>
              </View>
            </View>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>

          {/* User Invite Code 1-Tap Copy Box */}
          <View style={styles.inviteCodeCard}>
            <View style={styles.inviteCodeLeft}>
              <Text style={styles.inviteCodeLabel}>유저 초대 코드</Text>
              <Text style={styles.inviteCodeValue}>{MOCK_USER_PROFILE.inviteCode}</Text>
            </View>
            <TouchableOpacity 
              style={styles.copyBtn} 
              onPress={handleCopyInviteCode}
              activeOpacity={0.7}
            >
              <Text style={styles.copyIconText}>📋</Text>
            </TouchableOpacity>
          </View>

          {/* Toast Notification for Clipboard Copy */}
          {copiedToast && (
            <View style={styles.toastBox}>
              <Text style={styles.toastText}>✅ 초대 코드가 클립보드에 복사되었습니다!</Text>
            </View>
          )}

          {/* KakaoTalk Share Banner */}
          <TouchableOpacity style={styles.kakaoBanner} activeOpacity={0.85}>
            <View style={styles.kakaoTextGroup}>
              <Text style={styles.kakaoSubText}>카카오톡으로 간편하게</Text>
              <Text style={styles.kakaoMainText}>초대 코드 바로 공유하기</Text>
            </View>
            <View style={styles.talkCircle}>
              <Text style={styles.talkText}>TALK</Text>
            </View>
          </TouchableOpacity>

          {/* Primary Action Items */}
          <View style={styles.menuGroupSection}>
            <TouchableOpacity style={styles.menuItemRow} activeOpacity={0.7}>
              <Text style={styles.menuItemText}>초대 코드 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemRow} activeOpacity={0.7}>
              <Text style={styles.menuItemText}>초대 코드 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemRow} activeOpacity={0.7}>
              <Text style={styles.menuItemText}>조직 관리</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Customer Service & Legal Terms */}
          <View style={styles.menuGroupSection}>
            <TouchableOpacity style={styles.menuItemRow} activeOpacity={0.7}>
              <Text style={styles.menuItemMutedText}>고객센터</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemRow} activeOpacity={0.7}>
              <Text style={styles.menuItemMutedText}>이용약관 / 개인정보 처리방침</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  backdrop: {
    flex: 1,
  },
  drawerContent: {
    width: '82%',
    height: '100%',
    backgroundColor: Colors.surface,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  userHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userNameText: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  appointedBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointedBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.textWhite,
    fontWeight: Typography.weight.bold,
  },
  chevronIcon: {
    fontSize: 22,
    color: Colors.textMuted,
    fontWeight: '300',
  },
  inviteCodeCard: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  inviteCodeLeft: {
    gap: 2,
  },
  inviteCodeLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  inviteCodeValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  copyBtn: {
    padding: 6,
  },
  copyIconText: {
    fontSize: 20,
  },
  toastBox: {
    backgroundColor: Colors.primaryBg,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  toastText: {
    fontSize: Typography.size.xs,
    color: Colors.primaryDark,
    fontWeight: Typography.weight.bold,
    textAlign: 'center',
  },
  kakaoBanner: {
    height: 64,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  kakaoTextGroup: {
    gap: 2,
  },
  kakaoSubText: {
    fontSize: Typography.size.xs,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  kakaoMainText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.heavy,
    color: Colors.textWhite,
  },
  talkCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEE500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: {
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
    color: '#3C1E1E',
  },
  menuGroupSection: {
    gap: 4,
    marginTop: 8,
  },
  menuItemRow: {
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  menuItemMutedText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
});
