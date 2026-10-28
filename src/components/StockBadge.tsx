import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

export default function StockBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>Hết sách</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.errorContainer,
  },
  label: {
    ...typography.labelMedium,
    color: colors.error,
  },
});
