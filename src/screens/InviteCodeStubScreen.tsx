import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography } from '../constants/colors';

interface InviteCodeStubScreenProps {
  onBack: () => void;
}

export const InviteCodeStubScreen: React.FC<InviteCodeStubScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>초대 코드 등록</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Stub Box - Dashed Blue Border */}
        <View style={styles.stubBox}>
          <Text style={styles.stubTitle}>화면 스텁 (구현 예정)</Text>
          <Text style={styles.stubDetail}>정의서: # 화면: 초대 코드 등록 (Spec 1~10)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontWeight: '300',
    lineHeight: 32,
  },
  headerTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 36,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  stubBox: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: 20,
    gap: 6,
  },
  stubTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  stubDetail: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
});
