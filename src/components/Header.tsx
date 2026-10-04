import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Colors, Typography } from '../constants/colors';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  onDrawerPress?: () => void;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = '트렌드포스',
  showBackButton = false,
  onBackPress,
  onNotificationPress,
  onDrawerPress,
  hasUnreadNotifications = true,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
      <View style={styles.headerContainer}>
        {/* Left Side: Back button or App Title/Logo */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity 
              style={styles.backButtonRow} 
              onPress={onBackPress}
              activeOpacity={0.7}
              accessibilityLabel="뒤로가기"
            >
              <Text style={styles.backChevron}>‹</Text>
              <Text style={styles.appTitle}>{title}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.appTitle}>{title}</Text>
          )}
        </View>

        {/* Right Side: Notification Bell & Hamburger Drawer */}
        <View style={styles.rightSection}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onNotificationPress}
            activeOpacity={0.7}
            accessibilityLabel="알림 모음"
          >
            <Text style={styles.headerIconText}>🔔</Text>
            {hasUnreadNotifications && <View style={styles.notificationBadge} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onDrawerPress}
            activeOpacity={0.7}
            accessibilityLabel="메뉴 열기"
          >
            <View style={styles.hamburgerIcon}>
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.surface,
  },
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  backChevron: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.textPrimary,
    marginTop: -2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceSecondary,
    position: 'relative',
  },
  headerIconText: {
    fontSize: 18,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.notificationDot,
  },
  hamburgerIcon: {
    width: 18,
    height: 14,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 18,
    height: 2,
    backgroundColor: Colors.textPrimary,
    borderRadius: 1,
  },
});
