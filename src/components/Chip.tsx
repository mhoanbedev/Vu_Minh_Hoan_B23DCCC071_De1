import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm * 2,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  selected: {
    borderColor: colors.secondaryContainer,
    backgroundColor: colors.secondaryContainer,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  selectedLabel: {
    color: colors.onSecondaryContainer,
  },
});
