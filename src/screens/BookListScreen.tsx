import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import BookCard from '../components/BookCard';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import SummaryBar from '../components/SummaryBar';
import { useBooks } from '../context/BookContext';
import { RootStackParamList } from '../navigation/types';
import { Book } from '../types/book';
import {
  ALL_CATEGORIES,
  CategoryFilterValue,
  filterBooks,
} from '../utils/bookHelpers';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookList'>;

export default function BookListScreen({ navigation }: Props) {
  const { books, isLoading, deleteBook } = useBooks();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<CategoryFilterValue>(ALL_CATEGORIES);

  const filteredBooks = useMemo(
    () => filterBooks(books, keyword, category),
    [books, keyword, category],
  );

  const totalBorrowed = useMemo(
    () => books.reduce((sum, book) => sum + book.borrowed, 0),
    [books],
  );

  const handleLongPress = (book: Book) => {
    if (book.borrowed > 0) {
      Alert.alert(
        'Không thể xoá',
        `"${book.title}" đang có ${book.borrowed} cuốn được mượn.`,
      );
      return;
    }
    Alert.alert('Xoá sách', `Bạn có chắc muốn xoá "${book.title}"?`, [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Xoá', style: 'destructive', onPress: () => deleteBook(book.id) },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <SummaryBar totalTitles={books.length} totalBorrowed={totalBorrowed} />
        <SearchBar value={keyword} onChangeText={setKeyword} />
        <CategoryFilter value={category} onChange={setCategory} />
      </View>
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() =>
              navigation.navigate('BookDetail', { bookId: item.id })
            }
            onLongPress={() => handleLongPress(item)}
          />
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <EmptyState
            title={
              books.length === 0 ? 'Chưa có sách nào' : 'Không tìm thấy sách'
            }
            description={
              books.length === 0
                ? 'Nhấn "+ Thêm sách" để thêm cuốn đầu tiên.'
                : 'Thử đổi từ khoá hoặc thể loại khác.'
            }
          />
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <AppButton
          title="+ Thêm sách"
          onPress={() => navigation.navigate('BookForm')}
        />
      </View>
    </SafeAreaView>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  header: {
    gap: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outlineVariant,
    backgroundColor: colors.background,
  },
});
