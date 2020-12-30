import { BOOK_SUCCESS } from './actions';

const initialState = { books: [] };

export default function books(state = initialState, action) {
  switch (action.type) {
    case BOOK_SUCCESS:
      return { books: action.books };
    default:
      return state;
  }
}
