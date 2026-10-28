import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Book } from '../types/book';
import { getRemaining } from '../utils/bookHelpers';
import { colors, radius, spacing, typography } from '../theme';
import StockBadge from './StockBadge';

interface BookCardProps {
  book: Book;
  onPress: () => void;
  onLongPress: () => void;
}

export default function BookCard({
  book,
  onPress,
  onLongPress,
}: BookCardProps) {
  const remaining = getRemaining(book);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <Text style={styles.category}>{book.category}</Text>
      </View>
      <View style={styles.stock}>
        {remaining === 0 ? (
          <StockBadge />
        ) : (
          <>
            <Text style={styles.remaining}>{remaining}</Text>
            <Text style={styles.remainingLabel}>còn lại</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.titleMedium,
    color: colors.onSurface,
  },
  author: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  category: {
    ...typography.labelMedium,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  stock: {
    alignItems: 'center',
    marginLeft: spacing.md,
    minWidth: 56,
  },
  remaining: {
    ...typography.titleLarge,
    color: colors.onSurface,
  },
  remainingLabel: {
    ...typography.labelMedium,
    color: colors.onSurfaceVariant,
  },
});
