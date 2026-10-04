import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography } from '../constants/colors';

const ZONES = [
  { label: '안심', color: Colors.riskSafe, minPercent: 6, maxPercent: 20 },
  { label: '보통', color: Colors.riskNormal, minPercent: 30, maxPercent: 44 },
  { label: '주의', color: Colors.riskCaution, minPercent: 54, maxPercent: 68 },
  { label: '위험', color: Colors.riskDanger, minPercent: 78, maxPercent: 92 },
];

export const DynamicGaugeBar: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState<number>(0);
  const animValue = useRef(new Animated.Value(ZONES[0].minPercent)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random zone index (0: 안심, 1: 보통, 2: 주의, 3: 위험)
      const nextIndex = Math.floor(Math.random() * ZONES.length);
      setActiveZoneIndex(nextIndex);
      const targetZone = ZONES[nextIndex];
      // Pick a random spot inside the target zone percentage range
      const targetPercent = targetZone.minPercent + Math.random() * (targetZone.maxPercent - targetZone.minPercent);

      Animated.spring(animValue, {
        toValue: targetPercent,
        friction: 6,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }, 3000);

    return () => clearInterval(interval);
  }, [animValue]);

  const activeColor = ZONES[activeZoneIndex].color;

  const leftInterpolation = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.gaugeContainer}>
      {/* Animated Pointer (▼) Row */}
      <View style={styles.pointerTrack}>
        <Animated.View style={[styles.pointerWrapper, { left: leftInterpolation }]}>
          <Text style={[styles.pointerTriangle, { color: activeColor }]}>▼</Text>
        </Animated.View>
      </View>

      {/* 4-Color Gauge Bar Track */}
      <View style={styles.gaugeTrack}>
        <View style={[styles.gaugeSegment, { backgroundColor: Colors.riskSafe, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: Colors.riskNormal }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: Colors.riskCaution }]} />
        <View style={[styles.gaugeSegment, { backgroundColor: Colors.riskDanger, borderTopRightRadius: 6, borderBottomRightRadius: 6 }]} />
      </View>

      {/* 4 Zone Labels */}
      <View style={styles.gaugeLabelsRow}>
        {ZONES.map((zone, idx) => {
          const isSelected = idx === activeZoneIndex;
          return (
            <Text
              key={zone.label}
              style={[
                styles.gaugeLabel,
                isSelected && { color: zone.color, fontWeight: Typography.weight.heavy, fontSize: 13 }
              ]}
            >
              {zone.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gaugeContainer: {
    marginVertical: 12,
  },
  pointerTrack: {
    height: 18,
    position: 'relative',
    marginBottom: 2,
  },
  pointerWrapper: {
    position: 'absolute',
    transform: [{ translateX: -7 }],
    alignItems: 'center',
  },
  pointerTriangle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gaugeTrack: {
    height: 14,
    flexDirection: 'row',
    borderRadius: 7,
    overflow: 'hidden',
  },
  gaugeSegment: {
    flex: 1,
  },
  gaugeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  gaugeLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    fontWeight: Typography.weight.medium,
  },
});
