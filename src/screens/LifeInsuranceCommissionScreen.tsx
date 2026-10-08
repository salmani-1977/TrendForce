import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { CompanyLogoIcon } from '../components/CompanyLogoIcon';
import { MOCK_LIFE_COMMISSION_DATA, InsuranceCommissionItem } from '../data/insuranceCommissionData';

interface LifeInsuranceCommissionScreenProps {
  onBack?: () => void;
}

type MainTab = 'protection' | 'savings';

const GUARANTEE_CHIPS = ['전체', '정기', '종신', 'CI/GI', '암', '실손', '간병치매'];
const SAVINGS_CHIPS = ['전체', '저축', '일반연금', '변액연금', 'VUL'];

export const LifeInsuranceCommissionScreen: React.FC<LifeInsuranceCommissionScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('protection');
  const [selectedChip, setSelectedChip] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentChips = activeTab === 'protection' ? GUARANTEE_CHIPS : SAVINGS_CHIPS;

  const filteredProducts = MOCK_LIFE_COMMISSION_DATA.filter((item) => {
    if (item.category !== activeTab) return false;
    if (selectedChip !== '전체' && item.subCategory !== selectedChip) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.productName.toLowerCase().includes(q) || item.insurerName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Dynamic Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>생명보험 상품 수수료율</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="보험사명 또는 상품명 검색"
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Primary Main Sub-Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'protection' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('protection');
            setSelectedChip('전체');
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'protection' && styles.activeTabText]}>[보장]</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'savings' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('savings');
            setSelectedChip('전체');
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'savings' && styles.activeTabText]}>[저축]</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Chips Horizontal Scroll */}
      <View style={styles.chipContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScrollContent}>
          {currentChips.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[styles.chipPill, selectedChip === chip && styles.activeChipPill]}
              onPress={() => setSelectedChip(chip)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, selectedChip === chip && styles.activeChipText]}>[{chip}]</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Legal & Regulation Warning Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.disclaimerText}>
          ⓘ 기본 정렬: 가나다순 | SOURCE_TYPE: INSURER_OFFICIAL (보험사 공식 원장 데이터)
        </Text>
      </View>

      {/* Product List */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>현재 데이터만으로 확인할 수 없습니다.</Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.cardTopRow}>
                <CompanyLogoIcon companyName={product.insurerName} size={36} />
                <View style={styles.titleContainer}>
                  <Text style={styles.companyName}>{product.insurerName}</Text>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.productName}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardBottomRow}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{product.subCategory}</Text>
                </View>
                <View style={styles.rateContainer}>
                  <Text style={styles.rateLabel}>수수료율 </Text>
                  <Text style={styles.rateValue}>{product.commissionRate.toLocaleString()}%</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>기준일자: {product.effectiveDate}</Text>
                <Text style={styles.sourceTag}>[{product.sourceType}]</Text>
              </View>
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
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  headerRightPlaceholder: {
    width: 28,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.textPrimary,
    padding: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.textWhite,
  },
  chipContainer: {
    marginBottom: 8,
  },
  chipScrollContent: {
    paddingHorizontal: 16,
    gap: 6,
  },
  chipPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
  },
  activeChipPill: {
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  activeChipText: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  disclaimerBanner: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  emptyBox: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  productCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  productName: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagBadge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.bold,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rateLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  rateValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.heavy,
    color: Colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  metaText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  sourceTag: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
});
