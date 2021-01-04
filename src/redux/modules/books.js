import BookService from '../../services/BookService';
import { call, put, delay, takeEvery, select } from 'redux-saga/effects';

// namespace
const namespace = 'fds17-my-books/books';

// action types
export const BOOK_SUCCESS = namespace + '/BOOK_SUCCESS';
export const BOOK_START = namespace + '/BOOK_START';
export const BOOK_FAIL = namespace + '/BOOK_FAIL';
export const BOOKS = namespace + '/BOOKS';
export const BOOKS_PENDING = namespace + '/BOOKS_PENDING';
export const BOOKS_FULFILLED = namespace + '/BOOKS_FULFILLED';
export const BOOKS_REJECTED = namespace + '/BOOKS_REJECTED';

// initial state
const initialState = { books: [], loading: false, error: null };

// reducer
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

// action creator
const bookSuccess = (books) => ({
  type: BOOK_SUCCESS,
  books,
});

const bookStart = () => ({
  type: BOOK_START,
});

const bookFail = (error) => ({
  type: BOOK_FAIL,
  error,
});

const BOOKS_SAGA = namespace + '/BOOKS_SAGA';

// saga
function* getBooksSaga() {
  try {
    yield put(bookStart());
    yield delay(2000);

    const token = yield select((state) => state.auth.token);
    const books = yield call(BookService.getBooks, token);

    yield put(bookSuccess(books));
  } catch (error) {
    console.log(error);
    yield put(bookFail(error));
  }
}

export const getBooksSagaStart = () => ({ type: BOOKS_SAGA });

export function* booksSaga() {
  yield takeEvery(BOOKS_SAGA, getBooksSaga);
}
