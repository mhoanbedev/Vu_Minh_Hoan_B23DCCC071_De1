import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Tìm theo tên sách hoặc tác giả"
      placeholderTextColor={colors.onSurfaceVariant}
      autoCorrect={false}
      returnKeyType="search"
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...typography.bodyLarge,
    height: 48,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceVariant,
    color: colors.onSurface,
  },
});
