import { push } from 'connected-react-router';
import { createActions, handleActions } from 'redux-actions';
import { delay, put, takeEvery, call } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';

// prefix
const prefix = 'fds17-my-books/auth';

// action creator
const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', {
  prefix,
});

// initial state
const initialState = { token: null, loading: false, error: null };

// reducer
const auth = handleActions(
  {
    START: () => ({ token: null, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default auth;

// saga
const SIGNIN_SAGA = prefix + '/SIGNIN_SAGA';
export const signinSagaStart = (email, password) => ({
  type: SIGNIN_SAGA,
  payload: { email, password },
});

export function* signinSaga(action) {
  try {
    yield put(start());

    const { email, password } = action.payload;

    const token = yield call(AuthService.login, email, password);
    yield delay(2000);

    localStorage.setItem('token', token); // 토큰을 브라우저 어딘가에 저장한다.
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(fail(error));
  }
}

export function* authSaga() {
  yield takeEvery(SIGNIN_SAGA, signinSaga);
}
