import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationStation({ active, numberOfPages, paginate }) {

  const pageNumbers = [];
  for (let number = 1; number <= numberOfPages; number++) {
    pageNumbers.push(
      <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>
      {pageNumbers}
    </Pagination>
  );
}