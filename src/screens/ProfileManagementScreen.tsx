import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
} from 'react-native';
import { Colors, Typography } from '../constants/colors';

interface ProfileManagementScreenProps {
  onBack: () => void;
}

const PROFILE_DATA = {
  name: '홍길동',
  birthDate: '1973.01.01',
  phone: '010-1919-1919',
  email: 'GILDONG@gmail.com',
  memberType: '위촉회원',
  recruiter: '김기영',
};

export const ProfileManagementScreen: React.FC<ProfileManagementScreenProps> = ({ onBack }) => {
  // 앱 시작 시 localStorage에서 Base64 사진 데이터 복원 (새로고침 후에도 유지)
  const [profileImageUri, setProfileImageUri] = useState<string | null>(() => {
    if (Platform.OS === 'web') {
      return localStorage.getItem('profile_image_b64') ?? null;
    }
    return null;
  });
  const [pendingImageUri, setPendingImageUri] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCameraPress = () => {
    if (Platform.OS === 'web') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // FileReader로 Base64 Data URL 변환 — 순수 텍스트이므로 localStorage에 영구 저장 가능
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setPendingImageUri(base64);
        setShowSaveModal(true);
      }
    };
    reader.readAsDataURL(file);
    // 동일 파일 재선택 가능하도록 input 초기화
    e.target.value = '';
  };

  const handleSaveConfirm = () => {
    if (pendingImageUri) {
      // 화면 상태 업데이트
      setProfileImageUri(pendingImageUri);
      // Base64 문자열을 localStorage에 영구 저장 → 강제 새로고침 후에도 완벽 복원
      if (Platform.OS === 'web') {
        localStorage.setItem('profile_image_b64', pendingImageUri);
      }
      setPendingImageUri(null);
    }
    setShowSaveModal(false);
  };

  const handleSaveCancel = () => {
    setPendingImageUri(null);
    setShowSaveModal(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Hidden web file input */}
      {Platform.OS === 'web' && (
        <input
          ref={fileInputRef as React.RefObject<HTMLInputElement>}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필 관리</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.avatarWrapper}>
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarEmoji}>👤</Text>
              </View>
            )}
            {/* Camera Icon */}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleCameraPress}
              activeOpacity={0.8}
            >
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{PROFILE_DATA.name}</Text>
        </View>

        <View style={styles.divider} />

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>생년월일</Text>
            <Text style={styles.infoValue}>{PROFILE_DATA.birthDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>전화번호</Text>
            <Text style={styles.infoValue}>{PROFILE_DATA.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>계정</Text>
            <View style={styles.accountRow}>
              <View style={styles.kakaoIcon}>
                <Text style={styles.kakaoIconText}>💬</Text>
              </View>
              <Text style={styles.infoValue}>{PROFILE_DATA.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Activity Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>활동 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>회원등급</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>{PROFILE_DATA.memberType}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>증원인</Text>
            <View style={styles.recruiterRow}>
              <Text style={styles.infoValue}>{PROFILE_DATA.recruiter}</Text>
              <View style={styles.phoneButton}>
                <Text style={styles.phoneIcon}>📞</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Confirmation Modal */}
      <Modal
        visible={showSaveModal}
        transparent
        animationType="fade"
        onRequestClose={handleSaveCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>사진 저장</Text>
            <Text style={styles.modalMessage}>선택한 사진을 프로필 사진으로{'\n'}저장하시겠습니까?</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={handleSaveCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleSaveConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.modalConfirmText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  photoSection: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    backgroundColor: Colors.surface,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    position: 'relative',
    marginBottom: 14,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarEmoji: {
    fontSize: 44,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  cameraIcon: {
    fontSize: 14,
  },
  profileName: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  divider: {
    height: 8,
    backgroundColor: Colors.background,
  },
  section: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  infoLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.textPrimary,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kakaoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FEE500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoIconText: {
    fontSize: 12,
  },
  memberBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberBadgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textWhite,
  },
  recruiterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 13,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    width: 280,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelButton: {
    backgroundColor: Colors.surfaceSecondary,
  },
  modalConfirmButton: {
    backgroundColor: Colors.primary,
  },
  modalCancelText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textSecondary,
  },
  modalConfirmText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textWhite,
  },
});
