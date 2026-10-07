import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { CustomButton } from '../components/CustomButton';
import { DynamicGaugeBar } from '../components/DynamicGaugeBar';
import { MOCK_TREATMENT_COSTS, MOCK_COVERAGE_ANALYSIS } from '../constants/mockData';

interface HealthAnalysisScreenProps {
  onNavigateToReport?: () => void;
}

export const HealthAnalysisScreen: React.FC<HealthAnalysisScreenProps> = ({ onNavigateToReport }) => {
  // Floating Mascot Animation Control
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Top 3D Mascot Character Banner with Floating Animation */}
      <View style={styles.topMascotContainer}>
        <Animated.View style={[styles.mascotFloatingWrapper, { transform: [{ translateY }] }]}>
          <View style={styles.mascotAvatarCard}>
            <Text style={styles.mascotEmoji}>🐻‍❄️</Text>
            <View style={styles.mascotBadge}>
              <Text style={styles.mascotBadgeText}>CARE</Text>
            </View>
          </View>
          <View style={[styles.riskBubble, styles.bubbleLeft]}>
            <Text style={styles.bubbleText}>심장질환 <Text style={styles.redRiskText}>위험 87%</Text></Text>
          </View>
          <View style={[styles.riskBubble, styles.bubbleRight]}>
            <Text style={styles.bubbleText}>당뇨병 <Text style={styles.orangeRiskText}>위험 73%</Text></Text>
          </View>
        </Animated.View>
      </View>

      {/* Main Status Overview Card */}
      <View style={styles.card}>
        <Text style={styles.statusTitle}>
          예원님, <Text style={styles.redHighlightText}>위험 신호가{'\n'}몸 곳곳에</Text> 있어요
        </Text>
        <Text style={styles.statusSubTitle}>
          검진과 가족력에서, 또래보다 앞선 위험을 찾았어요
        </Text>

        {/* 4-Color Risk Calibration Gauge Bar (Dynamic 3-Second Animation S04) */}
        <DynamicGaugeBar />

        {/* Risk Items */}
        <View style={styles.riskListContainer}>
          <View style={styles.riskRowItem}>
            <Text style={styles.diseaseNameText}>심장병 위험</Text>
            <View style={[styles.riskBadgePill, { backgroundColor: '#FEE2E2' }]}>
              <Text style={[styles.riskBadgeText, { color: Colors.riskDanger }]}>최대 87%</Text>
            </View>
          </View>
          <View style={styles.riskRowItem}>
            <Text style={styles.diseaseNameText}>당뇨병 위험</Text>
            <View style={[styles.riskBadgePill, { backgroundColor: '#FFF5EF' }]}>
              <Text style={[styles.riskBadgeText, { color: Colors.primary }]}>최대 73%</Text>
            </View>
          </View>
          <View style={styles.riskRowItem}>
            <Text style={styles.diseaseNameText}>뇌졸중 위험</Text>
            <View style={[styles.riskBadgePill, { backgroundColor: '#D1FAE5' }]}>
              <Text style={[styles.riskBadgeText, { color: Colors.riskSafe }]}>최대 15%</Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="종합 건강 리포트 보기"
          onPress={() => onNavigateToReport?.()}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
      </View>

      {/* Card 2: 치료비, 얼마나 들까요? */}
      <View style={styles.card}>
        <Text style={styles.cardSectionHeader}>
          <Text style={styles.redHighlightText}>치료비, 얼마나 들까요?{'\n'}</Text>
          미리 확인해 보세요
        </Text>

        <View style={styles.treatmentList}>
          {MOCK_TREATMENT_COSTS.map((t, idx) => (
            <View key={idx} style={styles.treatmentRow}>
              <View style={styles.treatmentTagGroup}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagBadgeText}>{t.diseaseCategory}</Text>
                </View>
                <Text style={styles.treatmentTitle}>{t.treatmentName}</Text>
              </View>
              <Text style={styles.costValueText}>{t.estimatedCost}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chronicNoticeBox}>
          <Text style={styles.chronicNoticeText}>
            만성질환은 치료 후에도 <Text style={styles.boldText}>매년 병원비 33만원</Text>이 또 들어요
          </Text>
          <Text style={styles.chronicNoticeSub}>(심평원 진료현황 2024)</Text>
        </View>

        <CustomButton
          title="치료비 전체보기"
          onPress={() => {}}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
      </View>

      {/* Card 3: 심장병 치료·진단비 부족분 */}
      <View style={styles.card}>
        <Text style={styles.cardSectionHeader}>
          심장병 치료·진단비{'\n'}
          총 <Text style={styles.redHighlightText}>8,500 만원</Text>이 부족해요
        </Text>

        <View style={styles.coverageList}>
          {MOCK_COVERAGE_ANALYSIS.map((cov, idx) => (
            <View key={idx} style={styles.coverageItem}>
              <View style={styles.covTitleRow}>
                <Text style={styles.covCategoryText}>{cov.category}</Text>
                <Text style={styles.covAmountText}>
                  {cov.coveredAmount > 0 ? `${cov.coveredAmount.toLocaleString()} 만원` : '0 원'}
                  <Text style={styles.covTargetSub}> | {cov.targetAmount.toLocaleString()}만원</Text>
                </Text>
              </View>
              <View style={styles.covProgressBarTrack}>
                <View 
                  style={[
                    styles.covProgressBarFill, 
                    { width: `${cov.percentage}%`, backgroundColor: cov.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        <CustomButton
          title="보장분석 전체 보기"
          onPress={() => {}}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
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
    gap: 14,
    paddingBottom: 36,
  },
  topMascotContainer: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  mascotFloatingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 50,
  },
  mascotAvatarCard: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#93C5FD',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
  },
  mascotEmoji: {
    fontSize: 54,
  },
  mascotBadge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  mascotBadgeText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: Colors.textWhite,
  },
  riskBubble: {
    position: 'absolute',
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  bubbleLeft: {
    top: 4,
    left: -40,
  },
  bubbleRight: {
    top: 48,
    right: -40,
  },
  bubbleText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  redRiskText: {
    color: Colors.riskDanger,
  },
  orangeRiskText: {
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statusTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 6,
  },
  redHighlightText: {
    color: Colors.riskDanger,
  },
  statusSubTitle: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  riskListContainer: {
    marginVertical: 14,
    gap: 10,
  },
  riskRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  diseaseNameText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  riskBadgePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  cardOutlineBtn: {
    width: '100%',
    marginTop: 10,
  },
  cardSectionHeader: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    lineHeight: 26,
  },
  treatmentList: {
    gap: 12,
  },
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  treatmentTagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagBadge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagBadgeText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  treatmentTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  costValueText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.heavy,
    color: Colors.riskDanger,
  },
  chronicNoticeBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginVertical: 14,
  },
  chronicNoticeText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  chronicNoticeSub: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  boldText: {
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  coverageList: {
    gap: 14,
    marginBottom: 14,
  },
  coverageItem: {
    gap: 6,
  },
  covTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  covCategoryText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  covAmountText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  covTargetSub: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    fontWeight: '400',
  },
  covProgressBarTrack: {
    height: 8,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  covProgressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
