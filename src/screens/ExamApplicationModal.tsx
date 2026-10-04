import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated, Image, Platform } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { CustomButton } from '../components/CustomButton';
import { SocialProofTicker } from '../components/SocialProofTicker';

const GoldenPigImage = require('../assets/images/9. 황금돼지 바탕 지움.png');

interface ExamApplicationModalProps {
  onClose?: () => void;
  onApply?: () => void;
}

export const ExamApplicationModal: React.FC<ExamApplicationModalProps> = ({
  onClose,
  onApply,
}) => {
  // Floating Animation for Golden Pig Mascot
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -14,
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.modalContainer}>
        {/* Top Pastel Sky Blue Visual Area */}
        <View style={styles.topVisualArea}>
          {/* Fixed Header with Close Button */}
          <View style={styles.topHeaderRow}>
            <View style={{ width: 32 }} />
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Seamless Fade Overlay (Image 4 Effect) */}
        <View style={styles.topFadeOverlay} pointerEvents="none" />

        {/* Scrollable Main Content */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitleText}>
              남에게 흘러간 돈{'\n'}나에게로 되돌려요
            </Text>
            <Text style={styles.heroSubTitleText}>
              시험 한 번이면 시작할 수 있어요
            </Text>

            {/* 3D Golden Pig Hero Graphic - mix-blend-mode removes gray bg */}
            <View style={styles.heroGraphicWrapper}>
              <Animated.View style={[styles.pigFloatingCard, { transform: [{ translateY }] }]}>
                <Image
                  source={GoldenPigImage}
                  style={[
                    styles.goldenPigImage,
                    Platform.select({
                      web: { mixBlendMode: 'multiply' } as any,
                    }),
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
              <Text style={styles.graphicSubCaption}>보장분석도 같이 진행할게요</Text>
            </View>
          </View>

          {/* Detailed Legal & Recruitment Info Sections (100% Pure White Background) */}
          <View style={styles.detailSectionsContainer}>
            {/* 1. 보험설계사 채용 안내 */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionHeaderTitle}>보험설계사 채용 안내</Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletText}>
                  • [트렌드포스]는 (주)트렌드포스가 운영하는 보험설계사 채용·위촉 안내 서비스로, 보험설계사 자격시험 응시 절차와 위촉 과정을 안내해 드려요.
                </Text>
                <Text style={styles.bulletText}>
                  • 회사는 보험업법에 따라 등록된 보험대리점이며, 본 안내는 보험설계사 채용을 위한 것으로 특정 보험상품의 판매·권유·청약을 목적하지 않아요.
                </Text>
                <Text style={styles.bulletText}>
                  • 만 19세 이상 내국인으로, 보험설계사 등록 결격사유가 없는 분이라면 누구나 지원할 수 있어요.
                </Text>
                <Text style={styles.bulletText}>
                  • 보험설계사로 활동하려면 생명보험·손해보험·제3보험 등 관련 자격시험에 합격하고, 회사와 위촉계약을 체결한 뒤 협회에 설계사로 정상 등록되어야 해요.
                </Text>
              </View>
            </View>

            {/* 2. 수당·환급 관련 안내 */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionHeaderTitle}>수당·환급 관련 안내</Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletText}>
                  • 화면에 안내되는 '돌려받는 금액'은, 본인이 보험설계사로 위촉된 후 본인 명의로 보험계약을 체결(가입)했을 때 발생하는 모집수수료(수당)를 의미해요. 보험 가입 없이 지급되는 금액이 아니에요.
                </Text>
                <Text style={styles.bulletText}>
                  • 수수료(수당)는 원수보험사(원수사), 보험상품, 주계약 및 특약 구성, 환산보험료, 납입기간·납입주기, 그리고 회사 및 원수사의 시책(인센티브) 등에 따라 달라질 수 있어요.
                </Text>
                <Text style={styles.bulletText}>
                  • 따라서 안내된 금액은 예상치 또는 예시이며, 실제 지급되는 수수료는 계약 조건과 시점에 따라 달라질 수 있고 지급을 보장하지 않아요.
                </Text>
                <Text style={styles.bulletText}>
                  • 보험계약이 조기에 해지·실효되는 경우, 관련 규정 및 위촉계약 조건에 따라 이미 지급된 수수료의 전부 또는 일부가 환수될 수 있어요.
                </Text>
              </View>
            </View>

            {/* 3. 유의사항 */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionHeaderTitle}>유의사항</Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletText}>
                  • 본 안내는 채용 절차 및 회사 사정에 따라 사전 고지 없이 변경되거나 종료될 수 있어요.
                </Text>
                <Text style={styles.bulletText}>
                  • 보험설계사는 회사와 위촉계약을 맺은 개인사업자로, 근로기준법상 근로자와는 지위가 달라요. 활동 실적에 따라 소득이 발생하며, 고정급을 보장하지 않아요.
                </Text>
                <Text style={styles.bulletText}>
                  • 보험 가입 여부는 전적으로 본인의 자유로운 의사에 따라 결정해야 하며, 수수료 수령만을 목적으로 한 불필요한 가입은 권하지 않아요.
                </Text>
                <Text style={styles.bulletText}>
                  • 비정상적인 방법으로 참여하거나 허위 정보를 제출한 경우, 위촉 및 수수료 지급이 사전 통보 없이 취소·환수될 수 있어요.
                </Text>
                <Text style={styles.bulletText}>
                  • 자세한 자격 요건, 수수료 체계, 위촉 조건 등은 위촉 상담 및 계약 단계에서 별도로 안내해 드려요.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Seamless Fade Overlay (Image 3 Effect) */}
        <View style={styles.bottomFadeOverlay} pointerEvents="none" />

        {/* Fixed Bottom Section: Social Proof Ticker & Action Button */}
        <View style={styles.bottomFixedContainer}>
          <SocialProofTicker />
          <CustomButton
            title="시험 신청"
            onPress={onApply || (() => { })}
            variant="primary"
            style={styles.applyBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topVisualArea: {
    backgroundColor: '#EBF3FF',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #EBF3FF 0%, #FFFFFF 100%)',
      },
    }),
  },
  topHeaderRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  closeBtn: {
    padding: 6,
  },
  closeIconText: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as any,
    }),
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 80,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 52,
    backgroundColor: '#EBF3FF',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #EBF3FF 0%, #FFFFFF 100%)',
        minHeight: 'calc(100vh - 165px)',
      },
      default: {
        minHeight: 580,
      },
    }),
  },
  heroTitleText: {
    fontSize: 26,
    fontWeight: Typography.weight.heavy,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubTitleText: {
    fontSize: Typography.size.base,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  heroGraphicWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pigFloatingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: { mixBlendMode: 'multiply' } as any,
    }),
  },
  goldenPigImage: {
    width: 380,
    height: 380,
  },
  graphicSubCaption: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: -0.2,
  },
  detailSectionsContainer: {
    marginTop: 0,
    gap: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  infoSection: {
    gap: 10,
  },
  sectionHeaderTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  bulletList: {
    gap: 8,
  },
  bulletText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  topFadeOverlay: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    height: 36,
    zIndex: 10,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, rgba(235, 243, 255, 0.95) 0%, rgba(235, 243, 255, 0) 100%)',
      },
    }),
  },
  bottomFadeOverlay: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    height: 52,
    zIndex: 10,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
      },
    }),
  },
  bottomFixedContainer: {
    position: Platform.OS === 'web' ? ('sticky' as any) : 'relative',
    bottom: 0,
    zIndex: 50,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  applyBtn: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2563EB',
  },
});
