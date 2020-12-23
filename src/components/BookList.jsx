import React from 'react';
import axios from 'axios';
import { sleep } from '../utils';
import { LoadingOutlined } from '@ant-design/icons';

export default class BookList extends React.Component {
  state = {
    books: [],
    loading: false,
  };

  render() {
    const { books, loading } = this.state;

    return (
      <div>
        <h1>Book List {loading && <LoadingOutlined />}</h1>
        <ul>
          {books.map((book) => {
            return <li>{book.title}</li>;
          })}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    // 서버에 책 리스트 다오.
    this.setState({ loading: true });
    const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });

    await sleep(2000);

    // 받은 책 리스트로 다시 랜더 해줘 <= state
    this.setState({ books: response.data, loading: false });
  }
}
