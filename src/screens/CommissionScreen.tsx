import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { MOCK_USER_PROFILE, MOCK_COMMISSION_CONTRACTS } from '../constants/mockData';
import { formatCurrency } from '../utils/formatters';
import { CompanyLogoIcon } from '../components/CompanyLogoIcon';

export const CommissionScreen: React.FC = () => {
  const recentContracts = MOCK_COMMISSION_CONTRACTS.filter(c => c.category === 'recent');
  const holderContracts = MOCK_COMMISSION_CONTRACTS.filter(c => c.category === 'holder');
  const nonHolderContracts = MOCK_COMMISSION_CONTRACTS.filter(c => c.category === 'non_holder');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Top Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardSubTitle}>내가 놓친 보험 수수료</Text>
          <Text style={styles.infoBadge}>ⓘ</Text>
        </View>

        <Text style={styles.heroAmountText}>
          {formatCurrency(MOCK_USER_PROFILE.missedCommissionAmount)}
        </Text>

        <View style={styles.summaryGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>내 보험 수</Text>
            <Text style={styles.gridValue}>{MOCK_USER_PROFILE.totalContractsCount} 건</Text>
          </View>
          <View style={styles.gridDivider} />
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>총 월 보험료</Text>
            <Text style={styles.gridValue}>292,800 원</Text>
          </View>
        </View>
      </View>

      {/* Section 1: 최근에 가입한 보험 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderTitle}>최근에 가입한 보험</Text>
        {recentContracts.map((contract) => (
          <View key={contract.id} style={styles.contractListItem}>
            <View style={{ marginRight: 12 }}>
              <CompanyLogoIcon companyName={contract.companyName} size={36} />
            </View>
            <View style={styles.contractTextContainer}>
              <Text style={styles.contractTitleText} numberOfLines={1}>
                {contract.productName}
              </Text>
              <Text style={styles.commissionAmountText}>
                계약 수수료 <Text style={styles.blueHighlight}>{formatCurrency(contract.commissionAmount)}</Text>
              </Text>
            </View>
            {contract.dDayBadge && (
              <View style={styles.dDayPill}>
                <Text style={styles.dDayText}>{contract.dDayBadge}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Section 2: 내가 계약자인 보험 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderTitle}>내가 계약자인 보험</Text>
        {holderContracts.map((contract) => (
          <TouchableOpacity key={contract.id} style={styles.contractListItem} activeOpacity={0.7}>
            <View style={{ marginRight: 12 }}>
              <CompanyLogoIcon companyName={contract.companyName} size={36} />
            </View>
            <View style={styles.contractTextContainer}>
              <Text style={styles.contractTitleText} numberOfLines={1}>
                {contract.productName}
              </Text>
              <Text style={styles.commissionAmountText}>
                계약 수수료 <Text style={styles.blueHighlight}>{formatCurrency(contract.commissionAmount)}</Text>
              </Text>
            </View>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section 3: 내가 계약자가 아닌 보험 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderTitle}>내가 계약자가 아닌 보험</Text>
        {nonHolderContracts.map((contract) => (
          <TouchableOpacity key={contract.id} style={styles.contractListItem} activeOpacity={0.7}>
            <View style={{ marginRight: 12 }}>
              <CompanyLogoIcon companyName={contract.companyName} size={36} />
            </View>
            <View style={styles.contractTextContainer}>
              <Text style={styles.contractTitleText} numberOfLines={1}>
                {contract.productName}
              </Text>
              <Text style={styles.commissionAmountText}>
                계약 수수료 <Text style={styles.blueHighlight}>{formatCurrency(contract.commissionAmount)}</Text>
              </Text>
            </View>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Banner: 혹시 안보이는 보험이 있나요? */}
      <TouchableOpacity style={styles.helpBannerContainer} activeOpacity={0.8}>
        <View style={styles.helpLeft}>
          <Text style={styles.umbrellaEmoji}>☔</Text>
          <Text style={styles.helpBannerTitle}>혹시 안보이는 보험이 있나요?</Text>
        </View>
        <Text style={styles.chevronIcon}>›</Text>
      </TouchableOpacity>

      {/* Footer Legal Disclaimers */}
      <View style={styles.legalNoticeBox}>
        <Text style={styles.noticeBullet}>
          • 본 자료는 (주)트렌드포스의 설계사 모집을 목적으로 제작·사용하는 자료로서 제3자에게 교부하거나 배포할 수 없습니다. 또한, 보험 안내 자료(광고, 선전물)로 오인토록 사용하는 것은 법규에 의하여 책임을 묻고 있습니다.
        </Text>
        <Text style={styles.noticeBullet}>
          • TrendForce는 보험대리점인 (주)트렌드포스 플랫폼으로, CODEF에서 제공받은 각 금융기관의 보험 가입 정보를 기준으로 서비스를 제공합니다. 일부 금융기관 정보가 CODEF의 정보 제공 기준과 다르게 제공되는 경우 실제 가입 정보와 다를 수 있으며, 자세한 내용은 가입한 보험상품의 증권과 약관을 확인해 주세요.
        </Text>
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
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  cardSubTitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  infoBadge: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  heroAmountText: {
    fontSize: Typography.size.title,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  gridItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  gridDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  gridLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  gridValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  sectionContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionHeaderTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  contractListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  contractLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoEmoji: {
    fontSize: 18,
  },
  contractTextContainer: {
    flex: 1,
  },
  contractTitleText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  commissionAmountText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  blueHighlight: {
    color: Colors.primary,
  },
  dDayPill: {
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dDayText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  chevronIcon: {
    fontSize: 20,
    color: Colors.textMuted,
    fontWeight: '300',
    paddingLeft: 8,
  },
  helpBannerContainer: {
    height: 52,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  umbrellaEmoji: {
    fontSize: 18,
  },
  helpBannerTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  legalNoticeBox: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 8,
  },
  noticeBullet: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
