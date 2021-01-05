import React from 'react';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

/*

author: "오은영"
bookId: 4085
createdAt: "2020-12-08T06:19:20.000Z"
deletedAt: null
message: "오은영의 현실밀착 육아회화"
ownerId: "7a1fcf00-6cc6-4f54-84f1-2e55d301d4b5"
title: "어떻게 말해줘야 할까"
updatedAt: "2020-12-08T06:19:20.000Z"
url: "http://www.yes24.com/Product/Goods/93522583"

*/

const BookItem = React.memo(({ title, author, message, url }) => (
  <div>
    <h2>
      {title}{' '}
      <a href={url} target="_BLANK" rel="noreferrer">
        <Button icon={<HomeOutlined />} />
      </a>
    </h2>
    <h3>{author}</h3>
    <p>{message}</p>
  </div>
));

export default BookItem;
