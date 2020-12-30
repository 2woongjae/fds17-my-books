import {
  BOOKS_FULFILLED,
  BOOKS_PENDING,
  BOOKS_REJECTED,
  BOOK_FAIL,
  BOOK_START,
  BOOK_SUCCESS,
} from './actions';

const initialState = { books: [], loading: false, error: null };

export default function books(state = initialState, action) {
  switch (action.type) {
    case BOOK_SUCCESS:
      return { books: action.books, loading: false, error: null };
    case BOOKS_FULFILLED:
      return { books: action.payload, loading: false, error: null };
    case BOOK_START:
    case BOOKS_PENDING:
      return { ...state, loading: true, error: null };
    case BOOK_FAIL:
      return { ...state, loading: false, error: action.error };
    case BOOKS_REJECTED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
