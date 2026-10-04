import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { CustomButton } from '../components/CustomButton';
import { CompanyLogoIcon } from '../components/CompanyLogoIcon';
import { MOCK_USER_PROFILE, MOCK_HOME_CONTRACTS, MOCK_RECRUITED_MEMBERS, MOCK_TOP_PRODUCTS } from '../constants/mockData';
import { formatCurrency } from '../utils/formatters';

interface HomeScreenProps {
  onNavigateToCommission?: () => void;
  onNavigateToExam?: () => void;
  onNavigateToMore?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToCommission,
  onNavigateToExam,
  onNavigateToMore,
}) => {
  return (
    <View style={styles.mainWrapper}>
      {/* Floating Sticky Top Banner */}
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToExam}
        activeOpacity={0.8}
      >
        <Text style={styles.bannerText}>
          <Text style={styles.bannerIcon}>🎓 </Text>
          시험보고, 내 보험 수수료 내가 받기
        </Text>
        <Text style={styles.bannerChevron}>›</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Missed Commission Hero Card */}
        <View style={styles.heroCard}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTextSection}>
            <Text style={styles.userGreeting}>{MOCK_USER_PROFILE.name}님,</Text>
            <Text style={styles.missedHighlightTitle}>
              놓친 수수료가 <Text style={styles.missedCountText}>{MOCK_USER_PROFILE.missedCommissionCount}건</Text>이 있어요
            </Text>
          </View>

          {/* 3D Wealth Graphic Illustration */}
          <View style={styles.wealthIconContainer}>
            <View style={styles.wealthBagCircle}>
              <Text style={styles.wealthEmoji}>💰</Text>
              <View style={styles.wealthArrowBadge}>
                <Text style={styles.arrowEmoji}>🔄</Text>
              </View>
            </View>
          </View>
        </View>

        <CustomButton
          title="내가 놓친 수수료보기"
          onPress={() => onNavigateToCommission?.()}
          variant="primary"
          style={styles.cardMainBtn}
        />
      </View>

      {/* "내 보험 수수료" Overview Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>내 보험 수수료</Text>
          <Text style={styles.infoBadge}>ⓘ</Text>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.totalAmountText}>
            {formatCurrency(MOCK_USER_PROFILE.missedCommissionAmount)}
          </Text>
          <TouchableOpacity activeOpacity={0.6} style={styles.refreshBtn}>
            <Text style={styles.refreshIcon}>🔄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>가입 보험 수</Text>
            <Text style={styles.metricValue}>{MOCK_USER_PROFILE.totalContractsCount}건</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>월 납입 보험료</Text>
            <Text style={styles.metricValue}>{formatCurrency(MOCK_USER_PROFILE.monthlyPremium)}</Text>
          </View>
        </View>

        <CustomButton
          title="건 별 수수료 보기"
          onPress={() => onNavigateToCommission?.()}
          variant="primary"
          style={styles.cardMainBtn}
        />
      </View>

      {/* "내 보험 계약" Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>내 보험 계약</Text>
        <View style={styles.contractList}>
          {MOCK_HOME_CONTRACTS.map((contract) => (
            <View key={contract.id} style={styles.contractItem}>
              <View style={{ marginRight: 12 }}>
                <CompanyLogoIcon companyName={contract.companyName} size={36} />
              </View>
              <View style={styles.contractInfo}>
                <Text style={styles.productName} numberOfLines={1}>{contract.productName}</Text>
                <Text style={styles.commissionSubText}>
                  계약 수수료 <Text style={styles.questionMarkText}>??? 원</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>

        <CustomButton
          title="나의 보험 계약 수수료 전부 보기"
          onPress={() => onNavigateToCommission?.()}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
      </View>

      {/* "최근, 내 코드를 등록한 회원" Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>최근, 내 코드를 등록한 회원</Text>
        <View style={styles.memberSection}>
          {MOCK_RECRUITED_MEMBERS.map((member) => (
            <View key={member.id} style={styles.memberCardItem}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>👩🏻‍💼</Text>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
          ))}
        </View>

        <CustomButton
          title="내 회원 전체보기"
          onPress={() => onNavigateToMore?.()}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
      </View>

      {/* "이번 달 혜택 & 수수료 TOP 3" Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{"이번 달 혜택 & 수수료 TOP 3"}</Text>
        <View style={styles.topProductList}>
          {MOCK_TOP_PRODUCTS.map((prod) => (
            <View key={prod.id} style={styles.topProductItem}>
              <View style={{ marginRight: 12 }}>
                <CompanyLogoIcon companyName={prod.companyName} size={36} />
              </View>
              <View style={styles.topProdInfo}>
                <Text style={styles.companySubLabel}>{prod.companyName}</Text>
                <Text style={styles.topProdName} numberOfLines={1}>{prod.productName}</Text>
              </View>
              <Text style={styles.rateHighlightText}>{prod.rate}</Text>
            </View>
          ))}
        </View>

        <CustomButton
          title="상품 수수료 전체보기"
          onPress={() => onNavigateToCommission?.()}
          variant="outline"
          style={styles.cardOutlineBtn}
        />
      </View>
    </ScrollView>
    </View>
  );
};

const getLogoBg = (company: string): string => {
  if (company.includes('신한')) return '#FF6B35';
  if (company.includes('메리츠')) return '#EF4444';
  if (company.includes('현대')) return '#F59E0B';
  return Colors.primary;
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 32,
    gap: 14,
  },
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 42,
    backgroundColor: 'rgba(255, 245, 239, 0.95)',
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE3D1',
  },
  bannerText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primaryDark,
  },
  bannerIcon: {
    fontSize: 14,
  },
  bannerChevron: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontWeight: '400',
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  heroTextSection: {
    flex: 1,
    paddingRight: 10,
  },
  userGreeting: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  missedHighlightTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  missedCountText: {
    color: Colors.primary,
  },
  wealthIconContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wealthBagCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accentGoldLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
    position: 'relative',
  },
  wealthEmoji: {
    fontSize: 28,
  },
  wealthArrowBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accentCyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowEmoji: {
    fontSize: 11,
  },
  cardMainBtn: {
    width: '100%',
    marginTop: 4,
  },
  cardOutlineBtn: {
    width: '100%',
    marginTop: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  infoBadge: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalAmountText: {
    fontSize: Typography.size.title,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  refreshBtn: {
    padding: 6,
  },
  refreshIcon: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  metricsContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  metricDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 6,
  },
  metricLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  metricValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  contractList: {
    gap: 12,
    marginVertical: 4,
  },
  contractItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  companyLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 14,
    fontWeight: Typography.weight.bold,
    color: Colors.textWhite,
  },
  contractInfo: {
    flex: 1,
  },
  productName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  commissionSubText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  questionMarkText: {
    color: Colors.primary,
  },
  memberSection: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  memberCardItem: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  memberName: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.textPrimary,
  },
  topProductList: {
    gap: 10,
    marginVertical: 4,
  },
  topProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  topProdInfo: {
    flex: 1,
  },
  companySubLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  topProdName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  rateHighlightText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.heavy,
    color: Colors.primary,
  },
});
