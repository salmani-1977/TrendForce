import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { TabType } from '../types';

interface TabBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
}

const TABS: TabConfig[] = [
  { id: 'home', label: '홈', icon: '🏠' },
  { id: 'commission', label: '수수료', icon: '📄' },
  { id: 'health', label: '건강 분석', icon: '🧡' },
  { id: 'exam', label: '시험 신청', icon: '🎓' },
  { id: 'more', label: '더보기', icon: '🎛️' },
];

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBarContainer}>
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.7}
              accessibilityLabel={`${tab.label} 탭`}
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconBg]}>
                <Text style={[styles.tabIconText, isActive && styles.activeIconText]}>
                  {tab.icon}
                </Text>
              </View>
              <Text style={[styles.tabLabel, isActive ? styles.activeLabel : styles.inactiveLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  tabBarContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    paddingHorizontal: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    width: 32,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  activeIconBg: {
    backgroundColor: Colors.primaryBg,
  },
  tabIconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  activeIconText: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: Typography.size.xs,
    marginTop: 2,
    letterSpacing: -0.2,
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  inactiveLabel: {
    color: Colors.textMuted,
    fontWeight: Typography.weight.medium,
  },
});
