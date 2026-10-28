import AsyncStorage from '@react-native-async-storage/async-storage';

import { SAMPLE_BOOKS } from '../data/sampleBooks';
import { Book } from '../types/book';

const STORAGE_KEY = 'library_books';

export async function saveBooks(books: Book[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export async function loadBooks(): Promise<Book[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    await saveBooks(SAMPLE_BOOKS);
    return SAMPLE_BOOKS;
  }
  try {
    return JSON.parse(raw) as Book[];
  } catch {
    return SAMPLE_BOOKS;
  }
}
