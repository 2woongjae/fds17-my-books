import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookList from '../components/BookList';
import { bookFail, bookStart, bookSuccess } from '../redux/actions';
import { sleep } from '../utils';
import axios from 'axios';

export default function BookListContainer({ token }) {
  // redux 와의 연결고리
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  const getBooks = useCallback(async () => {
    try {
      dispatch(bookStart());

      await sleep(2000);

      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(bookSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(bookFail(error));
    }
  }, [dispatch, token]);

  return (
    <BookList
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
    />
  );
}
