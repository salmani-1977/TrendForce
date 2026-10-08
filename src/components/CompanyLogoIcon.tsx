import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

const SHINHAN_LOGO = require("../../'개발 앱' 제공할 이미지 보관함/10. 신한로고-removebg-preview.png");

interface CompanyLogoIconProps {
  companyName: string;
  size?: number;
}

export const CompanyLogoIcon: React.FC<CompanyLogoIconProps> = ({ companyName, size = 36 }) => {
  const normalizedName = companyName ? companyName.trim() : '';
  const isWeb = Platform.OS === 'web';

  // 1. 신한라이프 / 신한생명 (사용자 제공 정식 10. 신한로고-removebg-preview.png 엠블럼)
  if (normalizedName.includes('신한')) {
    return (
      <Image
        source={SHINHAN_LOGO}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="contain"
      />
    );
  }

  // 1-2. 한화생명 / 한화손해보험 (한화 오렌지 HH 엠블럼)
  if (normalizedName.includes('한화')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#F37023" />
          <text
            x="18"
            y="22"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
          >
            HH
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#F37023' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.38, fontWeight: '900', color: '#FFFFFF' }]}>
          HH
        </Text>
      </View>
    );
  }

  // 2. 메리츠화재 (레드 meritz 소문자 엠블럼)
  if (normalizedName.includes('메리츠') || normalizedName.toLowerCase().includes('meritz')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#E52521" />
          <text
            x="18"
            y="21.5"
            textAnchor="middle"
            fill="white"
            fontSize="9.5"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.6"
          >
            meritz
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#E52521' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.26, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 }]}>
          meritz
        </Text>
      </View>
    );
  }

  // 3. 현대해상 (오렌지 H 시그니처 엠블럼)
  if (normalizedName.includes('현대')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#FF7A00" />
          <path d="M11.5 10V26M24.5 10V26M11.5 18H24.5" stroke="white" strokeWidth="4.5" strokeLinecap="square" />
          <path d="M9.5 10H13.5M22.5 10H26.5M9.5 26H13.5M22.5 26H26.5" stroke="white" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#FF7A00' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.48, fontWeight: '900', color: '#FFFFFF' }]}>
          H
        </Text>
      </View>
    );
  }

  // 4. DB손해보험 (그린 DB 엠블럼)
  if (normalizedName.includes('DB') || normalizedName.includes('디비')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#00A859" />
          <text
            x="18"
            y="22"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
          >
            DB
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#00A859' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.38, fontWeight: '900', color: '#FFFFFF' }]}>
          DB
        </Text>
      </View>
    );
  }

  // 5. 삼성생명 / 삼성화재 (딥블루 삼성 엠블럼)
  if (normalizedName.includes('삼성')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#074CA1" />
          <ellipse cx="18" cy="18" rx="13" ry="8" stroke="white" strokeWidth="1.8" fill="none" transform="rotate(-15 18 18)" />
          <text
            x="18"
            y="21.5"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            삼성
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#074CA1' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.34, fontWeight: '800', color: '#FFFFFF' }]}>
          삼성
        </Text>
      </View>
    );
  }

  // 6. KB손해보험 / KB라이프 (골드 KB 엠블럼)
  if (normalizedName.includes('KB') || normalizedName.includes('케이비')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#FFB800" />
          <text
            x="18"
            y="22"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
          >
            KB
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFB800' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.38, fontWeight: '900', color: '#FFFFFF' }]}>
          KB
        </Text>
      </View>
    );
  }

  // 7. 교보생명 (버건디 레드 교보 엠블럼)
  if (normalizedName.includes('교보')) {
    if (isWeb) {
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#C8102E" />
          <text
            x="18"
            y="21.5"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            교보
          </text>
        </svg>
      );
    }
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#C8102E' }]}>
        <Text style={[styles.symbolText, { fontSize: size * 0.34, fontWeight: '800', color: '#FFFFFF' }]}>
          교보
        </Text>
      </View>
    );
  }

  // 8. 기본 건물/집 엠블럼 (상대 앱 최근 가입 건물 로고 호환)
  if (isWeb) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#F4F2EC" />
        <path d="M18 10L10 16V25C10 25.5523 10.4477 26 11 26H25C25.5523 26 26 25.5523 26 25V16L18 10Z" fill="#D4D0C5" />
        <path d="M15 26V20H21V26H15Z" fill="#F4F2EC" />
      </svg>
    );
  }

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#F4F2EC' }]}>
      <Text style={[styles.symbolText, { fontSize: size * 0.42 }]}>
        🏠
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
