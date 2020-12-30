// {books: {books: []}, auth: {}, }

// action types

export const BOOK_SUCCESS = 'BOOK_SUCCESS';

// action creators
export const bookSuccess = (books) => ({
  type: BOOK_SUCCESS,
  books,
});
