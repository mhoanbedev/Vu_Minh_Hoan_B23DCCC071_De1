import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { CATEGORIES } from '../types/book';
import { ALL_CATEGORIES, CategoryFilterValue } from '../utils/bookHelpers';
import { spacing } from '../theme';
import Chip from './Chip';

const OPTIONS: CategoryFilterValue[] = [ALL_CATEGORIES, ...CATEGORIES];

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {OPTIONS.map(option => (
        <Chip
          key={option}
          label={option}
          selected={option === value}
          onPress={() => onChange(option)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
