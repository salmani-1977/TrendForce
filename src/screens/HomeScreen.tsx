import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
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
      {Platform.OS === 'web' && (
        <style>{`
          @keyframes goldenShimmerPulse {
            0% { opacity: 0.75; transform: scale(0.98); }
            50% { opacity: 1.0; transform: scale(1.02); }
            100% { opacity: 0.75; transform: scale(0.98); }
          }
        `}</style>
      )}

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

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Missed Commission Hero Card (황금빛 애니메이션 그라데이션 백드롭 적용) */}
        <View style={styles.heroCardExpanded}>
          {/* 우측 상단 노란 선 범위 지정 황금빛 애니메이션 그라데이션 */}
          <View 
            style={[
              styles.goldenAnimatedCornerBackdrop,
              Platform.OS === 'web' && ({
                backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(253, 224, 71, 0.85) 0%, rgba(254, 240, 138, 0.55) 35%, rgba(254, 243, 199, 0.20) 65%, rgba(255, 255, 255, 0) 100%)',
                animation: 'goldenShimmerPulse 3s ease-in-out infinite alternate',
              } as any)
            ]} 
          />
          <View style={styles.heroHeaderRowExpanded}>
            <View style={styles.heroTextSectionExpanded}>
              <Text style={styles.userGreetingExpanded}>{MOCK_USER_PROFILE.name}님,</Text>
              <Text style={styles.missedHighlightTitleExpanded}>
                놓친 수수료가 <Text style={styles.missedCountText}>{MOCK_USER_PROFILE.missedCommissionCount}건</Text>이 있어요
              </Text>
            </View>

            {/* 우측 상단 밀착 초대형 황금돼지 투명 이미지 */}
            <View style={styles.goldenPigContainer}>
              <Image
                source={require('../assets/images/9. 황금돼지 바탕 지움.png')}
                style={styles.goldenPigImageLarge}
                resizeMode="contain"
              />
            </View>
          </View>

          <CustomButton
            title="내가 놓친 수수료보기"
            onPress={() => onNavigateToCommission?.()}
            variant="primary"
            style={styles.heroButtonLarge}
          />
        </View>

        {/* "내 보험 수수료" 이중 폴더 탭 적용 카드 */}
        <View style={styles.tabWindowCardContainer}>
          {/* 상단 이중 서류 폴더 탭 헤더 영역 */}
          <View style={styles.windowTabHeaderWrapper}>
            {/* 1st 앞쪽 메인 탭 (흰색) */}
            <View style={styles.windowTabHeaderFront}>
              <Text style={styles.windowTabTitle}>내 보험 수수료</Text>
              <Text style={styles.windowInfoIcon}>ⓘ</Text>

              {/* 탭 우측 하단 접합부 유선형 곡선 커브 */}
              <View 
                style={[
                  styles.windowTabRightFilletCurve,
                  Platform.OS === 'web' && ({
                    boxShadow: '-4px 4px 0 0 #FFFFFF',
                  } as any)
                ]} 
              />
            </View>

            {/* 2nd 뒤쪽 이중 겹침 서류 폴더 탭 */}
            <View style={styles.windowTabHeaderBack} />

            {/* 나머지 상단 배경 바 */}
            <View style={styles.windowTabBackdropLine} />
          </View>

          {/* 카드 메인 본체 */}
          <View style={styles.windowCardBody}>
            <View style={styles.windowAmountRow}>
              <Text style={styles.windowAmountText}>
                {formatCurrency(MOCK_USER_PROFILE.missedCommissionAmount)}
              </Text>
              <TouchableOpacity activeOpacity={0.6} style={styles.cleanRefreshBtn}>
                <Text style={styles.cleanRefreshIcon}>↻</Text>
              </TouchableOpacity>
            </View>

            {/* 수평 구분선 */}
            <View style={styles.windowHorizontalDivider} />

            {/* 가입 보험 및 납입 보험료 지표 */}
            <View style={styles.windowMetricsContainer}>
              <View style={styles.windowMetricRow}>
                <Text style={styles.windowMetricLabel}>가입 보험 수</Text>
                <Text style={styles.windowMetricValue}>{MOCK_USER_PROFILE.totalContractsCount}건</Text>
              </View>
              <View style={styles.windowMetricRow}>
                <Text style={styles.windowMetricLabel}>월 납입 보험료</Text>
                <Text style={styles.windowMetricValue}>{formatCurrency(MOCK_USER_PROFILE.monthlyPremium)}</Text>
              </View>
            </View>

            {/* 하단 밀착 오렌지 버튼 */}
            <CustomButton
              title="건 별 수수료 보기"
              onPress={() => onNavigateToCommission?.()}
              variant="primary"
              style={styles.windowBottomBtn}
            />
          </View>
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
  heroCardExpanded: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    paddingTop: 38,
    paddingBottom: 24,
    paddingHorizontal: 22,
    minHeight: 265,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  goldenAnimatedCornerBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '54%',
    height: '75%',
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 110,
    zIndex: 0,
  },
  heroHeaderRowExpanded: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 155,
    marginBottom: 18,
    position: 'relative',
  },
  heroTextSectionExpanded: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'flex-end',
    paddingBottom: 4,
    zIndex: 2,
  },
  userGreetingExpanded: {
    fontSize: 18,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  missedHighlightTitleExpanded: {
    fontSize: 20,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    lineHeight: 27,
  },
  missedCountText: {
    color: Colors.primary,
  },
  goldenPigContainer: {
    position: 'absolute',
    top: -38,
    right: -24,
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  goldenPigImageLarge: {
    width: 180,
    height: 180,
  },
  heroButtonLarge: {
    width: '100%',
    marginTop: 8,
    zIndex: 3,
  },
  /* "내 보험 수수료" 이중 폴더 탭 스타일 카드 */
  tabWindowCardContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  windowTabHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    position: 'relative',
    zIndex: 2,
  },
  windowTabHeaderFront: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.borderLight,
    position: 'relative',
    zIndex: 3,
  },
  windowTabRightFilletCurve: {
    position: 'absolute',
    right: -12,
    bottom: 0,
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 12,
  },
  windowTabHeaderBack: {
    width: 160,
    height: 32,
    backgroundColor: '#E4EFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginLeft: -8,
    marginBottom: 0,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#D0E2FF',
    zIndex: 1,
  },
  windowTabBackdropLine: {
    flex: 1,
    height: 26,
    backgroundColor: '#F0F5FF',
    borderTopRightRadius: 18,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#E2E8F0',
    alignSelf: 'flex-end',
  },
  windowCardBody: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginTop: -1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  windowAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  windowAmountText: {
    fontSize: 28,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  cleanRefreshBtn: {
    padding: 6,
    borderRadius: 20,
  },
  cleanRefreshIcon: {
    fontSize: 22,
    color: Colors.textMuted,
    fontWeight: '300',
  },
  windowHorizontalDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 16,
  },
  windowMetricsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  windowMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  windowMetricLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  windowMetricValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  windowBottomBtn: {
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
