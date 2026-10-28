import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

interface SummaryBarProps {
  totalTitles: number;
  totalBorrowed: number;
}

export default function SummaryBar({
  totalTitles,
  totalBorrowed,
}: SummaryBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.value}>{totalTitles}</Text>
        <Text style={styles.label}>Đầu sách</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{totalBorrowed}</Text>
        <Text style={styles.label}>Cuốn đang mượn</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primaryContainer,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.outlineVariant,
  },
  value: {
    ...typography.headlineSmall,
    color: colors.onPrimaryContainer,
  },
  label: {
    ...typography.labelMedium,
    color: colors.onPrimaryContainer,
  },
});
