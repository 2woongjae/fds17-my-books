import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookList from '../components/BookList';
import { bookSuccess } from '../redux/actions';

export default function BookListContainer({ token }) {
  // redux 와의 연결고리
  const books = useSelector((state) => state.books.books);

  const dispatch = useDispatch();

  const setBooks = useCallback(
    (books) => {
      dispatch(bookSuccess(books));
    },
    [dispatch],
  );

  return <BookList token={token} books={books} setBooks={setBooks} />;
}
