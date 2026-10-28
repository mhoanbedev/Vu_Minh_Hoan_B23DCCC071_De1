import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import InfoRow from '../components/InfoRow';
import StockBadge from '../components/StockBadge';
import { useBooks } from '../context/BookContext';
import { RootStackParamList } from '../navigation/types';
import { getRemaining } from '../utils/bookHelpers';
import { colors, radius, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ navigation, route }: Props) {
  const { books, borrowBook, returnBook } = useBooks();
  const book = books.find(item => item.id === route.params.bookId);

  if (!book) {
    return <EmptyState title="Không tìm thấy sách" />;
  }

  const remaining = getRemaining(book);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.rows}>
            <InfoRow label="Thể loại" value={book.category} />
            <InfoRow label="Năm xuất bản" value={book.year} />
            <InfoRow label="Tổng số cuốn" value={book.quantity} />
            <InfoRow label="Đang được mượn" value={book.borrowed} />
            <InfoRow
              label="Còn lại"
              value={remaining === 0 ? <StockBadge /> : remaining}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Cho mượn"
            onPress={() => borrowBook(book.id)}
            disabled={remaining === 0}
            style={styles.actionButton}
          />
          <AppButton
            title="Nhận trả"
            onPress={() => returnBook(book.id)}
            disabled={book.borrowed === 0}
            style={styles.actionButton}
          />
        </View>

        <AppButton
          title="Sửa thông tin"
          variant="outlined"
          onPress={() => navigation.navigate('BookForm', { bookId: book.id })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    ...typography.headlineSmall,
    color: colors.onSurface,
  },
  author: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  rows: {
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
