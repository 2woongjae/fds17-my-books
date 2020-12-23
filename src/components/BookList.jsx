import React from 'react';
import axios from 'axios';

export default class BookList extends React.Component {
  state = {
    books: [],
  };

  render() {
    const { books } = this.state;

    return (
      <div>
        <h1>Book List</h1>
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
    const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });

    console.log(response);

    // 받은 책 리스트로 다시 랜더 해줘 <= state
  }
}
