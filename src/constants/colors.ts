export const Colors = {
  // Brand Primary Palette (Warm Sunset Orange System)
  primary: '#FF6B35',          // Vivid Warm Orange (Main Brand Color)
  primaryDark: '#E05320',      // Deep Coral Orange
  primaryLight: '#FF8A50',     // Light Sunset Accent
  primaryGradientStart: '#FF6B35',
  primaryGradientEnd: '#FF9E66',
  primaryBg: '#FFF5EF',        // Warm Orange Tint Background for Cards

  // Secondary Accent & Point Colors
  accentCyan: '#06B6D4',       // Cyber Cyan (Highlights & FinTech accent)
  accentGold: '#F59E0B',       // Vivid Gold (Money & Reward badges)
  accentGoldLight: '#FEF3C7',  // Gold Tint Background

  // Neutral Background & Surface Tokens
  background: '#F8FAFC',       // Cool Slate Background
  surface: '#FFFFFF',          // Pure White Card Surface
  surfaceSecondary: '#F1F5F9',    // Secondary Surface Gray
  surfaceDark: '#0F172A',      // Slate Dark Overlay

  // Typography Colors
  textPrimary: '#0F172A',      // High contrast Slate 900
  textSecondary: '#475569',    // Slate 600
  textMuted: '#94A3B8',        // Slate 400
  textWhite: '#FFFFFF',

  // Status & Risk Level Colors (Health Gauge Bar S03/S04)
  riskSafe: '#10B981',         // Emerald Green (안심)
  riskNormal: '#FF6B35',       // Warm Orange (보통)
  riskCaution: '#F59E0B',      // Amber Gold (주의)
  riskDanger: '#EF4444',       // Crimson Red (위험)

  // Border & Divider Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',

  // System Colors
  notificationDot: '#FF6B35',  // Warm Orange Alert Badge
  shadow: '#0F172A',
} as const;

export const Typography = {
  fontFamily: 'System',
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
} as const;
