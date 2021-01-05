import BookService from '../../services/BookService';
import { call, put, delay, takeEvery, select } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import produce from 'immer';
import { push } from 'connected-react-router';

// namespace
const prefix = 'fds17-my-books/books';

// action creator
const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', {
  prefix,
});

// initial state
const initialState = { books: [], loading: false, error: null };

// reducer
const books = handleActions(
  {
    START: (state, action) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default books;

const BOOKS_SAGA = prefix + '/BOOKS_SAGA';
const ADD_BOOK_SAGA = prefix + '/ADD_BOOK_SAGA';

// saga
function* getBooksSaga() {
  try {
    yield put(start());
    yield delay(2000);

    const token = yield select((state) => state.auth.token);
    const books = yield call(BookService.getBooks, token);

    yield put(success(books));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

function* addBookSaga(action) {
  try {
    const book = action.payload;
    const books = yield select((state) => state.books.books); // []

    yield put(
      success(
        produce(books, (draft) => {
          draft.push(book);
        }),
      ),
    );
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

export const getBooksSagaStart = createAction(BOOKS_SAGA);
export const addBookSagaStart = createAction(ADD_BOOK_SAGA);

export function* booksSaga() {
  yield takeEvery(BOOKS_SAGA, getBooksSaga);
  yield takeEvery(ADD_BOOK_SAGA, addBookSaga);
}
