import { Category } from '../types/book';

export interface BookFormValues {
  title: string;
  author: string;
  category: Category;
  year: string;
  quantity: string;
}

export type BookFormErrors = Partial<Record<keyof BookFormValues, string>>;

const MIN_YEAR = 1900;
const INTEGER_PATTERN = /^\d+$/;

export function validateBook(
  values: BookFormValues,
  borrowed: number,
): BookFormErrors {
  const errors: BookFormErrors = {};
  const currentYear = new Date().getFullYear();
  const year = values.year.trim();
  const quantity = values.quantity.trim();

  if (!values.title.trim()) {
    errors.title = 'Vui lòng nhập tên sách';
  }

  if (!values.author.trim()) {
    errors.author = 'Vui lòng nhập tác giả';
  }

  if (!year) {
    errors.year = 'Vui lòng nhập năm xuất bản';
  } else if (!INTEGER_PATTERN.test(year)) {
    errors.year = 'Năm xuất bản phải là số';
  } else if (Number(year) < MIN_YEAR || Number(year) > currentYear) {
    errors.year = `Năm xuất bản phải từ ${MIN_YEAR} đến ${currentYear}`;
  }

  if (!quantity) {
    errors.quantity = 'Vui lòng nhập số lượng';
  } else if (!INTEGER_PATTERN.test(quantity)) {
    errors.quantity = 'Số lượng phải là số nguyên';
  } else if (Number(quantity) <= 0) {
    errors.quantity = 'Số lượng phải lớn hơn 0';
  } else if (Number(quantity) < borrowed) {
    errors.quantity = `Số lượng không được nhỏ hơn số cuốn đang mượn (${borrowed})`;
  }

  return errors;
}

export function hasErrors(errors: BookFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
