import React from 'react';
import axios from 'axios';
import { sleep } from '../utils';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BookItem from './BookItem';

export default class BookList extends React.Component {
  render() {
    const { books, loading, error } = this.props;

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
                onClick={this.getBooks}
              />
            </p>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Book List {loading && <LoadingOutlined />}</h1>
        {books.length === 0 && <p>데이터가 없습니다.</p>}
        {books.length !== 0 &&
          books.map((book) => {
            return <BookItem {...book} />;
          })}
      </div>
    );
  }

  getBooks = async () => {
    try {
      this.props.startBooks();

      await sleep(2000);

      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });

      this.props.successBooks(response.data);
    } catch (error) {
      console.log(error);
      this.props.failBooks(error);
    }
  };

  async componentDidMount() {
    await this.getBooks();
  }
}
