import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { loadBooks, saveBooks } from '../storage/bookStorage';
import { Book, BookInput } from '../types/book';

interface BookContextValue {
  books: Book[];
  isLoading: boolean;
  addBook: (input: BookInput) => void;
  updateBook: (id: string, input: BookInput) => void;
  deleteBook: (id: string) => void;
  borrowBook: (id: string) => void;
  returnBook: (id: string) => void;
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBooks()
      .then(setBooks)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveBooks(books);
    }
  }, [books, isLoading]);

  const addBook = (input: BookInput) => {
    const newBook: Book = { ...input, id: Date.now().toString(), borrowed: 0 };
    setBooks(prev => [newBook, ...prev]);
  };

  const updateBook = (id: string, input: BookInput) => {
    setBooks(prev =>
      prev.map(book => (book.id === id ? { ...book, ...input } : book)),
    );
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const borrowBook = (id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id && book.borrowed < book.quantity
          ? { ...book, borrowed: book.borrowed + 1 }
          : book,
      ),
    );
  };

  const returnBook = (id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id && book.borrowed > 0
          ? { ...book, borrowed: book.borrowed - 1 }
          : book,
      ),
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        addBook,
        updateBook,
        deleteBook,
        borrowBook,
        returnBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks(): BookContextValue {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used inside BookProvider');
  }
  return context;
}
