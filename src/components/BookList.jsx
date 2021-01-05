import React, { useEffect } from 'react';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';

//
export default function BookList({ books, loading, error, getBooks }) {
  useEffect(() => {
    // 데이타가 있는 상태에사 페이지로 돌아오면 다시 서버에서 가져오지 않는다. <= 요즘
    // Add 페이지에서 데이터를 서버에 보내고 돌아와서 서버에서 가져온다. <= 옛날
    getBooks();
  }, [getBooks]);

  if (error !== null) {
    const errorType = error.response.data.error;

    if (errorType === 'INVALID_TOKEN') {
      return (
        <div>
          <h1>Book List {loading && <LoadingOutlined />}</h1>
          <p>
            유효하지 않은 토큰 입니다.{' '}
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={getBooks}
            />
          </p>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Book List {loading && <LoadingOutlined />}</h1>
      <p>
        <button onClick={getBooks}>reload</button>
        <Link to="/add">Add</Link>
      </p>
      {books.length === 0 && <p>데이터가 없습니다.</p>}
      {books.length !== 0 &&
        books.map((book) => {
          return <BookItem {...book} key={book.bookId} />;
        })}
    </div>
  );
}
