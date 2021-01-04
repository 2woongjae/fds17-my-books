import { push } from 'connected-react-router';
import { delay, put, takeEvery, call } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';

// namespace
const namespace = 'fds17-my-books/auth';

// action types
const START = namespace + '/START';
const SUCCESS = namespace + '/SUCCESS';
const FAIL = namespace + '/FAIL';

// initial state
const initialState = { token: null, loading: false, error: null };

// reducer
export default function auth(state = initialState, action) {
  switch (action.type) {
    case START:
      return { token: null, loading: true, error: null };
    case SUCCESS:
      return { token: action.token, loading: false, error: null };
    case FAIL:
      return { token: null, loading: false, error: action.error };
    default:
      return state;
  }
}

// action creator
export const signinStart = () => ({ type: START });
export const signinSuccess = (token) => ({ type: SUCCESS, token });
export const signinFail = (error) => ({ type: FAIL, error });

// saga
const SIGNIN_SAGA = namespace + '/SIGNIN_SAGA';
export const signinSagaStart = (email, password) => ({
  type: SIGNIN_SAGA,
  payload: { email, password },
});

export function* signinSaga(action) {
  try {
    yield put(signinStart());

    const { email, password } = action.payload;

    const token = yield call(AuthService.login, email, password);
    yield delay(2000);

    localStorage.setItem('token', token); // 토큰을 브라우저 어딘가에 저장한다.
    yield put(signinSuccess(token));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(signinFail(error));
  }
}

export function* authSaga() {
  yield takeEvery(SIGNIN_SAGA, signinSaga);
}
