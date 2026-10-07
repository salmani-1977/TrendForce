import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { HomeScreen } from './src/screens/HomeScreen';
import { CommissionScreen } from './src/screens/CommissionScreen';
import { HealthAnalysisScreen } from './src/screens/HealthAnalysisScreen';
import { ExamApplicationModal } from './src/screens/ExamApplicationModal';
import { MoreScreen } from './src/screens/MoreScreen';
import { DrawerMenuScreen } from './src/screens/DrawerMenuScreen';
import { NotificationScreen } from './src/screens/NotificationScreen';
import { HealthReportScreen } from './src/screens/HealthReportScreen';
import { Colors } from './src/constants/colors';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const styleId = 'responsive-scrollbar-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          /* 모바일 핏 / 창 축소 시 (폭 600px 이하 또는 높이 900px 이하) 스크롤바 완벽 은폐 */
          @media (max-width: 600px), (max-height: 900px) {
            html, body, #root, div, section, main, article {
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
            ::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
              background: transparent !important;
            }
          }
          /* PC 윈도우 확장 시 윈도우 스크롤바 표출 */
          @media (min-width: 601px) and (min-height: 901px) {
            html, body {
              scrollbar-width: auto;
              scrollbar-color: #94A3B8 transparent;
            }
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            ::-webkit-scrollbar-thumb {
              background: rgba(148, 163, 184, 0.6);
              border-radius: 4px;
            }
            ::-webkit-scrollbar-track {
              background: transparent;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // [1-1단계 공정] 윈도우 회색 바탕 마우스 휠 스크롤 연동 핸들러
      const handleGlobalWheel = (e: WheelEvent) => {
        const appContainer = document.getElementById('mobile-app-root-container');
        if (!appContainer) return;

        const target = e.target as HTMLElement | null;
        // 커서가 앱 컨테이너 바깥(윈도우 회색 배경 영역)에 있거나 outerBackground에 있는 경우
        const isInsideApp = target ? appContainer.contains(target) : false;

        if (!isInsideApp) {
          // 앱 프레임 내부에서 현재 활성화된 스크롤 가능 영역(ScrollView div) 탐색
          const scrollables = Array.from(appContainer.querySelectorAll('*')).filter((el) => {
            const htmlEl = el as HTMLElement;
            const style = window.getComputedStyle(htmlEl);
            const overflowY = style.overflowY;
            const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && htmlEl.scrollHeight > htmlEl.clientHeight;
            return isScrollable;
          }) as HTMLElement[];

          if (scrollables.length > 0) {
            // 최상단/최근 활성 스크롤 영역에 deltaY 휠 값 전달
            const activeScrollable = scrollables[scrollables.length - 1];
            activeScrollable.scrollTop += e.deltaY;
          }
        }
      };

      window.addEventListener('wheel', handleGlobalWheel, { passive: true });
      return () => {
        window.removeEventListener('wheel', handleGlobalWheel);
      };
    }
  }, []);

  return (
    <View style={styles.outerBackground}>
      <View nativeID="mobile-app-root-container" style={styles.mobileAppContainer}>
        <RootNavigator
          renderHomeScreen={(navigateToTab) => (
            <HomeScreen
              onNavigateToCommission={() => navigateToTab('commission')}
              onNavigateToExam={() => navigateToTab('exam')}
              onNavigateToMore={() => navigateToTab('more')}
            />
          )}
          renderCommissionScreen={() => <CommissionScreen />}
          renderHealthScreen={(onNavigateToReport) => (
            <HealthAnalysisScreen onNavigateToReport={onNavigateToReport} />
          )}
          renderExamScreen={(onClose) => <ExamApplicationModal onClose={onClose} />}
          renderMoreScreen={() => <MoreScreen />}
          renderDrawerMenu={(onClose) => <DrawerMenuScreen onClose={onClose} />}
          renderNotificationScreen={(onClose) => <NotificationScreen onClose={onClose} />}
          renderHealthReportScreen={(onClose) => <HealthReportScreen onClose={onClose} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerBackground: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mobileAppContainer: {
    width: '100%',
    maxWidth: 480,
    height: '100%',
    backgroundColor: Colors.background,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
      },
      default: {},
    }),
  },
});
