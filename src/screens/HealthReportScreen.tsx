import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors, Typography } from '../constants/colors';

interface HealthReportScreenProps {
  onClose: () => void;
}

type DiseaseTab =
  | '당뇨병' | '심장병' | '고혈압' | '이상지질혈증' | '골다공증'
  | '뇌졸중' | '간암' | '폐암' | '백내장' | '대장암'
  | '위암' | '전립선암' | '치매' | '유방암' | '갑상선암' | '천식';

const DISEASE_TABS: DiseaseTab[] = [
  '당뇨병', '심장병', '고혈압', '이상지질혈증', '골다공증',
  '뇌졸중', '간암', '폐암', '백내장', '대장암',
  '위암', '전립선암', '치매', '유방암', '갑상선암', '천식',
];

// 공복혈당 꺾은선 그래프 데이터
const GLUCOSE_DATA = [
  { date: '2022.11', value: 95, color: '#3B82F6' },
  { date: '2024.07', value: 105, color: '#F97316' },
  { date: '2026.06', value: 101, color: '#F97316' },
];
const GLUCOSE_MIN = 80;
const GLUCOSE_MAX = 120;
const CHART_HEIGHT = 100;
const CHART_WIDTH = 260;

// 각 포인트의 Y 좌표 계산 (낮을수록 아래)
function calcY(value: number): number {
  const ratio = (value - GLUCOSE_MIN) / (GLUCOSE_MAX - GLUCOSE_MIN);
  return CHART_HEIGHT - ratio * CHART_HEIGHT;
}

// 각 포인트의 X 좌표 계산
function calcX(index: number): number {
  const spacing = CHART_WIDTH / (GLUCOSE_DATA.length - 1);
  return index * spacing;
}

// 웹 전용 SVG 꺾은선 차트
const GlucoseChart: React.FC = () => {
  const isWeb = Platform.OS === 'web';
  const points = GLUCOSE_DATA.map((d, i) => ({ x: calcX(i), y: calcY(d.value), ...d }));

  if (isWeb) {
    return (
      <View style={chartStyles.chartWrapper}>
        <svg
          width={CHART_WIDTH}
          height={CHART_HEIGHT + 20}
          viewBox={`-10 -10 ${CHART_WIDTH + 20} ${CHART_HEIGHT + 20}`}
          style={{ overflow: 'visible' }}
        >
          {/* 연결선 */}
          {points.slice(0, -1).map((p, i) => (
            <line
              key={i}
              x1={p.x} y1={p.y}
              x2={points[i + 1].x} y2={points[i + 1].y}
              stroke="#E2E8F0"
              strokeWidth="2"
            />
          ))}
          {/* 데이터 점 */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="7" fill={p.color} />
              <text
                x={p.x}
                y={p.y - 14}
                textAnchor="middle"
                fill={p.color}
                fontSize="12"
                fontWeight="700"
              >
                {p.value}
              </text>
            </g>
          ))}
          {/* 이번 대비 -4 뱃지 (마지막 점 위) */}
          <rect
            x={points[2].x - 30}
            y={points[2].y - 40}
            width="60"
            height="18"
            rx="9"
            fill="#1E293B"
          />
          <text
            x={points[2].x}
            y={points[2].y - 26}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="600"
          >
            이번 대비 -4
          </text>
        </svg>

        {/* X축 날짜 라벨 */}
        <View style={chartStyles.xAxisRow}>
          {GLUCOSE_DATA.map((d, i) => (
            <Text key={i} style={chartStyles.xLabel}>{d.date}</Text>
          ))}
        </View>
      </View>
    );
  }

  // 네이티브 폴백: 심플 수치 표시
  return (
    <View style={chartStyles.nativeChart}>
      {GLUCOSE_DATA.map((d, i) => (
        <View key={i} style={chartStyles.nativePoint}>
          <Text style={[chartStyles.nativeValue, { color: d.color }]}>{d.value}</Text>
          <Text style={chartStyles.nativeDate}>{d.date}</Text>
        </View>
      ))}
    </View>
  );
};

const chartStyles = StyleSheet.create({
  chartWrapper: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  xAxisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CHART_WIDTH,
    marginTop: 4,
  },
  xLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  nativeChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  nativePoint: {
    alignItems: 'center',
    gap: 4,
  },
  nativeValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  nativeDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
});

export const HealthReportScreen: React.FC<HealthReportScreenProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<DiseaseTab>('당뇨병');

  const tabScrollViewRef = React.useRef<ScrollView>(null);

  // 웹 마우스 휠 가로 스크롤 이벤트 지원
  const handleWheel = (e: React.WheelEvent) => {
    if (Platform.OS === 'web' && tabScrollViewRef.current) {
      if (e.deltaY !== 0) {
        // @ts-ignore
        const node = tabScrollViewRef.current.getScrollableNode
          ? tabScrollViewRef.current.getScrollableNode()
          : (tabScrollViewRef.current as any);
        if (node && node.scrollLeft !== undefined) {
          node.scrollLeft += e.deltaY;
        }
      }
    }
  };

  // 웹 마우스 드래그(Drag-to-Scroll) 가로 스크롤 이벤트 지원
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftStart = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (Platform.OS === 'web' && tabScrollViewRef.current) {
      isDragging.current = true;
      startX.current = e.pageX;
      // @ts-ignore
      const node = tabScrollViewRef.current.getScrollableNode
        ? tabScrollViewRef.current.getScrollableNode()
        : (tabScrollViewRef.current as any);
      if (node) {
        scrollLeftStart.current = node.scrollLeft || 0;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || Platform.OS !== 'web' || !tabScrollViewRef.current) return;
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    // @ts-ignore
    const node = tabScrollViewRef.current.getScrollableNode
      ? tabScrollViewRef.current.getScrollableNode()
      : (tabScrollViewRef.current as any);
    if (node) {
      node.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // 탭 클릭 시 해당 탭 위치로 수평 자동 스크롤 연동
  const tabLayouts = React.useRef<{ [key: string]: { x: number; width: number } }>({});

  const handleTabPress = (tab: DiseaseTab) => {
    setActiveTab(tab);

    const layout = tabLayouts.current[tab];
    if (layout && tabScrollViewRef.current) {
      // 선택된 탭이 화면 중앙 근처에 위치하도록 x 오프셋 계산
      const targetX = Math.max(0, layout.x - 100);

      if (Platform.OS === 'web') {
        // @ts-ignore
        const node = tabScrollViewRef.current.getScrollableNode
          ? tabScrollViewRef.current.getScrollableNode()
          : (tabScrollViewRef.current as any);
        if (node && node.scrollTo) {
          node.scrollTo({ left: targetX, behavior: 'smooth' });
        } else if (node && node.scrollLeft !== undefined) {
          node.scrollLeft = targetX;
        }
      } else {
        tabScrollViewRef.current.scrollTo({ x: targetX, animated: true });
      }
    }
  };

  const renderTabContent = () => {
    if (activeTab === '당뇨병') {
      return (
        <View style={styles.tabContentArea}>
          {/* 공복혈당 섹션 */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>공복혈당</Text>
              <Text style={styles.infoIcon}>ⓘ</Text>
            </View>
            <Text style={styles.glucoseCriteria}>
              정상: 100 미만 &nbsp;·&nbsp; 주의: 100-125 &nbsp;·&nbsp; 경고: 126 이상
            </Text>

            {/* 꺾은선 그래프 */}
            <GlucoseChart />
          </View>

          {/* 당뇨병 치료·진단비 섹션 */}
          <View style={styles.sectionCard}>
            <Text style={styles.costSectionTitle}>
              당뇨병 치료·진단비{'\n'}
              총 <Text style={styles.costAmountHighlight}>4,771만원</Text> 부족해요
            </Text>

            {/* 비용 항목 표 */}
            <View style={styles.costTable}>
              <View style={styles.costRow}>
                <Text style={styles.costItemName}>실손의료비</Text>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costCoveredAmount}>보장금액</Text>
                  <Text style={styles.costCoveredValue}>49만원</Text>
                </View>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costRecommendLabel}>권장금액</Text>
                  <Text style={styles.costRecommendValue}>49만원</Text>
                </View>
              </View>
              <View style={styles.costDivider} />

              <View style={styles.costRow}>
                <Text style={styles.costItemName}>수술·입원비</Text>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costCoveredAmount}>보장금액</Text>
                  <Text style={styles.costCoveredValue}>800만원</Text>
                </View>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costRecommendLabel}>권장금액</Text>
                  <Text style={styles.costRecommendValue}>500만원</Text>
                </View>
              </View>
              <View style={styles.costDivider} />

              <View style={styles.costRow}>
                <Text style={styles.costItemName}>사망·후유장해</Text>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costCoveredAmount}>보장금액</Text>
                  <Text style={styles.costCoveredValue}>29만원</Text>
                </View>
                <View style={styles.costAmountGroup}>
                  <Text style={styles.costRecommendLabel}>권장금액</Text>
                  <Text style={styles.costRecommendValue}>4,900만원</Text>
                </View>
              </View>
            </View>

            <Text style={styles.costFootnote}>* 네 보장은 금시역인이요</Text>
          </View>
        </View>
      );
    }

    // 나머지 15개 탭: 준비중 안내
    return (
      <View style={styles.preparingContainer}>
        <Text style={styles.preparingTitle}>{activeTab} 분석 준비 중이에요</Text>
        <Text style={styles.preparingSubTitle}>데이터 연동 후 제공될 예정이에요</Text>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      {/* ─── 상단 고정 헤더 ─── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onClose}
          activeOpacity={0.7}
          accessibilityLabel="뒤로가기"
        >
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>종합 건강 리포트</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* ─── 스크롤 콘텐츠 ─── */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 바디 차트 카드 */}
        <View style={styles.bodyChartCard}>
          <Text style={styles.bodyChartTitle}>나는 머리 끝까지 아파요</Text>
          <Text style={styles.bodyChartSubTitle}>
            종합 위험도 <Text style={styles.riskScoreText}>76점</Text>
          </Text>

          {/* 바디 차트 영역 */}
          <View style={styles.bodyChartArea}>
            {/* 곰 캐릭터 */}
            <View style={styles.mascotColumn}>
              <Text style={styles.mascotEmoji}>🐻‍❄️</Text>
            </View>

            {/* 우측 눈금 + 점선 */}
            <View style={styles.scoreScaleColumn}>
              {[
                { label: '머리 100점', isMyLine: true },
                { label: '75점', isMyLine: false },
                { label: '가슴 50점', isMyLine: false },
                { label: '25점', isMyLine: false },
                { label: '발 0점', isMyLine: false },
              ].map((item, idx) => (
                <View key={idx} style={styles.scaleRow}>
                  {item.isMyLine ? (
                    <View style={styles.myPositionRow}>
                      <View style={styles.dottedLine} />
                      <View style={styles.myBadge}>
                        <Text style={styles.myBadgeText}>나</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.plainScaleLine} />
                  )}
                  <Text style={styles.scaleLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 3개 지표 */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>검진 결과</Text>
              <Text style={[styles.statValue, { color: Colors.riskDanger }]}>경고 3개</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>가족력</Text>
              <Text style={[styles.statValue, { color: Colors.riskDanger }]}>경고 2개</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>생활 습관</Text>
              <Text style={[styles.statValue, { color: '#F97316' }]}>주의 1개</Text>
            </View>
          </View>
        </View>

        {/* 가로 스크롤 병명 탭 (16종) */}
        <ScrollView
          ref={tabScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={true}
          style={[
            styles.tabScrollView,
            Platform.OS === 'web' && ({ overflowX: 'auto', display: 'flex' } as any),
          ]}
          contentContainerStyle={[
            styles.tabScrollContent,
            Platform.OS === 'web' && ({ minWidth: 'max-content', display: 'flex', flexDirection: 'row' } as any),
          ]}
          // @ts-ignore (RN Web 호환)
          onWheel={handleWheel}
          // @ts-ignore
          onMouseDown={handleMouseDown}
          // @ts-ignore
          onMouseMove={handleMouseMove}
          // @ts-ignore
          onMouseUp={handleMouseUpOrLeave}
          // @ts-ignore
          onMouseLeave={handleMouseUpOrLeave}
        >
          {DISEASE_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onLayout={(e) => {
                  tabLayouts.current[tab] = {
                    x: e.nativeEvent.layout.x,
                    width: e.nativeEvent.layout.width,
                  };
                }}
                style={[
                  styles.tabItem,
                  isActive && styles.activeTabItem,
                  Platform.OS === 'web' && ({ flexShrink: 0, whiteSpace: 'nowrap' } as any),
                ]}
                onPress={() => handleTabPress(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive ? styles.activeTabText : styles.inactiveTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 탭 콘텐츠 */}
        {renderTabContent()}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* ─── 하단 고정 버튼 ─── */}
      <View style={styles.bottomButtonArea}>
        <TouchableOpacity style={styles.bottomButton} activeOpacity={0.85}>
          <Text style={styles.bottomButtonText}>미래 건강 대비, 보장 점검받기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ── 헤더 ──
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
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backChevron: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.textPrimary,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },

  // ── 스크롤 ──
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // ── 바디 차트 카드 ──
  bodyChartCard: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  bodyChartTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
  },
  bodyChartSubTitle: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  riskScoreText: {
    color: '#3B82F6',
    fontWeight: Typography.weight.bold,
  },
  bodyChartArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    minHeight: 140,
  },
  mascotColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
  },
  mascotEmoji: {
    fontSize: 72,
  },
  scoreScaleColumn: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 14,
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  myPositionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  myBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myBadgeText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  plainScaleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  scaleLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    width: 60,
    textAlign: 'right',
  },

  // ── 3개 지표 ──
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 14,
    marginTop: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  statValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },

  // ── 탭 ──
  tabScrollView: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tabScrollContent: {
    paddingLeft: 12,
    paddingRight: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: Colors.textPrimary,
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },
  activeTabText: {
    color: Colors.textPrimary,
    fontWeight: Typography.weight.bold,
  },
  inactiveTabText: {
    color: Colors.textMuted,
  },

  // ── 탭 콘텐츠 공통 ──
  tabContentArea: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },

  // ── 섹션 카드 ──
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  infoIcon: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  glucoseCriteria: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginBottom: 8,
  },

  // ── 치료비 섹션 ──
  costSectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: 16,
  },
  costAmountHighlight: {
    color: Colors.riskDanger,
    fontWeight: Typography.weight.heavy,
  },
  costTable: {
    gap: 0,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  costItemName: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  costAmountGroup: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  costCoveredAmount: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  costCoveredValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.riskDanger,
  },
  costRecommendLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  costRecommendValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textSecondary,
  },
  costDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  costFootnote: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 12,
  },

  // ── 준비중 안내 (나머지 탭) ──
  preparingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    gap: 10,
  },
  preparingTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  preparingSubTitle: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  // ── 하단 고정 버튼 ──
  bottomButtonArea: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  bottomButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
});
