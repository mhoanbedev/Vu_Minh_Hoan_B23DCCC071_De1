import { Book, Category } from '../types/book';

export const ALL_CATEGORIES = 'Tất cả';

export type CategoryFilterValue = Category | typeof ALL_CATEGORIES;

export function getRemaining(book: Book): number {
  return book.quantity - book.borrowed;
}

export function filterBooks(
  books: Book[],
  keyword: string,
  category: CategoryFilterValue,
): Book[] {
  const query = keyword.trim().toLowerCase();
  return books.filter(book => {
    const matchesCategory =
      category === ALL_CATEGORIES || book.category === category;
    const matchesKeyword =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchesCategory && matchesKeyword;
  });
}
