import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import Chip from '../components/Chip';
import FormField from '../components/FormField';
import { useBooks } from '../context/BookContext';
import { RootStackParamList } from '../navigation/types';
import { Book, CATEGORIES } from '../types/book';
import {
  BookFormErrors,
  BookFormValues,
  hasErrors,
  validateBook,
} from '../utils/validateBook';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookForm'>;

function getInitialValues(book?: Book): BookFormValues {
  return {
    title: book?.title ?? '',
    author: book?.author ?? '',
    category: book?.category ?? CATEGORIES[0],
    year: book ? String(book.year) : '',
    quantity: book ? String(book.quantity) : '',
  };
}

export default function BookFormScreen({ navigation, route }: Props) {
  const { books, addBook, updateBook } = useBooks();
  const editingBook = books.find(item => item.id === route.params?.bookId);

  const [values, setValues] = useState(() => getInitialValues(editingBook));
  const [errors, setErrors] = useState<BookFormErrors>({});

  const updateField = <K extends keyof BookFormValues>(
    field: K,
    value: BookFormValues[K],
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors = validateBook(values, editingBook?.borrowed ?? 0);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      return;
    }

    const input = {
      title: values.title.trim(),
      author: values.author.trim(),
      category: values.category,
      year: Number(values.year),
      quantity: Number(values.quantity),
    };

    if (editingBook) {
      updateBook(editingBook.id, input);
    } else {
      addBook(input);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <FormField
            label="Tên sách"
            value={values.title}
            onChangeText={text => updateField('title', text)}
            error={errors.title}
            placeholder="Nhập tên sách"
          />
          <FormField
            label="Tác giả"
            value={values.author}
            onChangeText={text => updateField('author', text)}
            error={errors.author}
            placeholder="Nhập tên tác giả"
          />

          <View style={styles.categoryField}>
            <Text style={styles.label}>Thể loại</Text>
            <View style={styles.categories}>
              {CATEGORIES.map(category => (
                <Chip
                  key={category}
                  label={category}
                  selected={values.category === category}
                  onPress={() => updateField('category', category)}
                />
              ))}
            </View>
          </View>

          <FormField
            label="Năm xuất bản"
            value={values.year}
            onChangeText={text => updateField('year', text)}
            error={errors.year}
            placeholder="Ví dụ: 2020"
            keyboardType="number-pad"
            maxLength={4}
          />
          <FormField
            label="Số lượng"
            value={values.quantity}
            onChangeText={text => updateField('quantity', text)}
            error={errors.quantity}
            placeholder="Tổng số cuốn"
            keyboardType="number-pad"
            maxLength={5}
          />

          <AppButton
            title={editingBook ? 'Lưu thay đổi' : 'Thêm sách'}
            onPress={handleSubmit}
            style={styles.submit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
  categoryField: {
    gap: spacing.xs,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  submit: {
    marginTop: spacing.sm,
  },
});
