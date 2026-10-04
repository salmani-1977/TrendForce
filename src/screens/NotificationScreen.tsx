import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { MOCK_NOTIFICATIONS } from '../constants/mockData';

interface NotificationScreenProps {
  onClose: () => void;
}

type FilterCategory = '전체' | '공지사항' | '조직관리' | '계약관리';

const FILTER_TABS: FilterCategory[] = ['전체', '공지사항', '조직관리', '계약관리'];

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('전체');

  const filteredNotifications = MOCK_NOTIFICATIONS.filter((item) => {
    if (activeTab === '전체') return true;
    if (activeTab === '공지사항') return item.category === '공지사항';
    if (activeTab === '조직관리') return item.category === '추천인' || item.category === '조직관리';
    if (activeTab === '계약관리') return item.category === '계약';
    return true;
  });

  return (
    // [공정 7] SafeAreaView 제거 → In-App 절대위치 오버레이 전용 구조
    // RootNavigator의 inAppOverlay(position:absolute)가 앱 프레임 내에서 전체 덮기를 담당
    <View style={styles.container}>
      {/* Header with Back Chevron */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* 4 Category Filter Tabs */}
      <View style={styles.tabContainer}>
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive ? styles.activeTabText : styles.inactiveTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notification List Content */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>해당하는 알림이 없습니다.</Text>
          </View>
        ) : (
          filteredNotifications.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.categoryTag}>{item.category}</Text>
                <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
              </View>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationContent}>{item.content}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    width: 36,
    justifyContent: 'center',
  },
  backChevron: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.textPrimary,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  tabContainer: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.size.sm,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  inactiveTabText: {
    color: Colors.textMuted,
    fontWeight: Typography.weight.medium,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTag: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  timeAgoText: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  notificationTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  notificationContent: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.size.base,
    color: Colors.textMuted,
  },
});
