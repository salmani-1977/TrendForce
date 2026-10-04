import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography } from '../constants/colors';

const TICKER_ITEMS = [
  '윤*준님은 30,899,386원 돌려받았어요',
  '유*진님은 109,369,719원 돌려받았어요',
  '김*민님은 52,430,120원 돌려받았어요',
  '박*현님은 78,190,000원 돌려받았어요',
];

export const SocialProofTicker: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const currentText = TICKER_ITEMS[index];
  // Parse name vs amount to color code amount in Electric Indigo / Cyan
  const parts = currentText.split('은 ');
  const namePart = parts[0] + '은 ';
  const amountPart = parts[1] || '';

  return (
    <View style={styles.tickerContainer}>
      <Animated.Text style={[styles.tickerText, { opacity: fadeAnim }]}>
        {namePart}
        <Text style={styles.amountHighlight}>{amountPart}</Text>
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tickerContainer: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickerText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weight.medium,
  },
  amountHighlight: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
});
