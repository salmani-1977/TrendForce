import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { TabBar } from '../components/TabBar';
import { Colors } from '../constants/colors';
import { TabType } from '../types';

interface RootNavigatorProps {
  renderHomeScreen: (navigateToTab: (tab: TabType) => void) => React.ReactNode;
  renderCommissionScreen: () => React.ReactNode;
  renderHealthScreen: (onNavigateToReport: () => void) => React.ReactNode;
  renderExamScreen: (onClose: () => void) => React.ReactNode;
  renderMoreScreen: (initialSubPage?: 'main' | 'profile' | 'organization' | 'invite_code' | 'life_rates' | 'nonlife_rates') => React.ReactNode;
  renderDrawerMenu: (
    onClose: () => void,
    navigateToMoreSubPage?: (subPage: 'profile' | 'organization' | 'invite_code' | 'life_rates' | 'nonlife_rates') => void
  ) => React.ReactNode;
  renderNotificationScreen: (onClose: () => void) => React.ReactNode;
  renderHealthReportScreen: (onClose: () => void) => React.ReactNode;
}

export const RootNavigator: React.FC<RootNavigatorProps> = ({
  renderHomeScreen,
  renderCommissionScreen,
  renderHealthScreen,
  renderExamScreen,
  renderMoreScreen,
  renderDrawerMenu,
  renderNotificationScreen,
  renderHealthReportScreen,
}) => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [moreSubPage, setMoreSubPage] = useState<'main' | 'profile' | 'organization' | 'invite_code' | 'life_rates' | 'nonlife_rates'>('main');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isHealthReportOpen, setIsHealthReportOpen] = useState<boolean>(false);

  const handleTabChange = (tab: TabType) => {
    if (tab !== 'more') {
      setMoreSubPage('main');
    }
    setCurrentTab(tab);
  };

  const handleNavigateToMoreSubPage = (subPage: 'profile' | 'organization' | 'invite_code' | 'life_rates' | 'nonlife_rates') => {
    setMoreSubPage(subPage);
    setCurrentTab('more');
    setIsDrawerOpen(false);
  };

  const isExamTab = currentTab === 'exam';

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'home':
        return renderHomeScreen(handleTabChange);
      case 'commission':
        return renderCommissionScreen();
      case 'health':
        return renderHealthScreen(() => setIsHealthReportOpen(true));
      case 'exam':
        return renderHomeScreen(handleTabChange);
      case 'more':
        return renderMoreScreen(moreSubPage);
      default:
        return renderHomeScreen(handleTabChange);
    }
  };

  return (
    <View style={styles.rootContainer}>
      {/* Top Header */}
      <Header
        title={currentTab === 'home' ? '트렌드포스' : getHeaderTitle(currentTab)}
        showBackButton={currentTab !== 'home'}
        onBackPress={() => handleTabChange('home')}
        onNotificationPress={() => setIsNotificationOpen(true)}
        onDrawerPress={() => setIsDrawerOpen(true)}
        hasUnreadNotifications={true}
      />

      {/* Main Content Body */}
      <View style={styles.contentArea}>
        {renderActiveScreen()}
      </View>

      {/* Bottom 5-Tab Bar (100% Hidden/Unmounted when Exam Application overlay is active) */}
      {!isExamTab && (
        <TabBar
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Exam Application In-App Overlay Layer [position: absolute, zIndex: 9999] */}
      {isExamTab && (
        <View style={styles.examOverlay}>
          {renderExamScreen(() => handleTabChange('home'))}
        </View>
      )}

      {/* [공정 7] 전체메뉴 드로어 — In-App absolute 오버레이 (Modal 제거, 앱 프레임 내부 고정) */}
      {isDrawerOpen && (
        <View style={styles.inAppOverlay}>
          {renderDrawerMenu(() => setIsDrawerOpen(false), handleNavigateToMoreSubPage)}
        </View>
      )}

      {/* [공정 7] 알림 화면 — In-App absolute 오버레이 (Modal 제거, 앱 프레임 내부 고정) */}
      {isNotificationOpen && (
        <View style={styles.inAppOverlay}>
          {renderNotificationScreen(() => setIsNotificationOpen(false))}
        </View>
      )}

      {/* [공정 8] 종합 건강 리포트 — In-App absolute 오버레이 */}
      {isHealthReportOpen && (
        <View style={styles.inAppOverlay}>
          {renderHealthReportScreen(() => setIsHealthReportOpen(false))}
        </View>
      )}
    </View>
  );
};

const getHeaderTitle = (tab: TabType): string => {
  switch (tab) {
    case 'commission':
      return '수수료';
    case 'health':
      return '건강 분석';
    case 'exam':
      return '시험 신청';
    case 'more':
      return '더보기';
    default:
      return '트렌드포스';
  }
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  contentArea: {
    flex: 1,
  },
  examOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: '#EBF3FF',
  },
  // [공정 7] 모바일 앱 프레임 내부 전용 오버레이
  // Modal 대신 position:absolute 사용 → maxWidth 480px 컨테이너 밖으로 절대 벗어나지 않음
  inAppOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8888,
  },
});
