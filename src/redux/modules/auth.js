import axios from 'axios';
import { sleep } from '../../utils';

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

// thunk
export const signinThunk = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(signinStart());
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    await sleep(2000);
    const token = response.data.token;
    localStorage.setItem('token', token); // 토큰을 브라우저 어딘가에 저장한다.
    dispatch(signinSuccess(token));

    // this.props.history.push('/'); // 페이지를 이동한다.
  } catch (error) {
    console.log(error);
    dispatch(signinFail(error));
  }
};
