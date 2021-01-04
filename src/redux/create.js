import { applyMiddleware, createStore } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'connected-react-router';

/*
{
  books: {books: [], loading: false, error: null},
  auth: {token: [], loading: false, error: null}
}
*/

// DI
const create = (history) =>
  createStore(
    reducer(history),
    {
      auth: {
        token: localStorage.getItem('token'),
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument(history),
        promise,
        routerMiddleware(history),
      ),
    ),
  );

export default create;

// const middleware = ({ dispatch, getState }) => (next) => (action) => {
//   if (typeof action === 'function') {
//     return action(dispatch, getState);
//   }

//   return next(action);
// };

// function middleware1(store) {
//   return (next) => {
//     console.log('middleware1', 1);
//     return (action) => {
//       console.log('middleware1', 2);
//       const returnValue = next(action);
//       console.log('middleware1', 3);
//       return returnValue;
//     };
//   };
// }
