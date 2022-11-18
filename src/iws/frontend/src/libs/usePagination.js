import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

const { Item } = Pagination

export function usePagination({ totPages, page, loadPage, show = 10 }) {
  const pagination = useMemo(
    () =>
      new Array(totPages)
        .fill(0)
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Item key={index} active={page === index + 1} onClick={() => loadPage(index + 1)}>
            {index + 1}
          </Item>
        ))
        .slice(page > show ? page - 1 : 0, page > show ? page - 1 + show : show),
    [totPages, page, loadPage],
  );

  return useMemo(
    () =>
      totPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => loadPage(1)} />
            <Pagination.Prev disabled={page === 1} onClick={() => loadPage(page - 1)} />
            {pagination}
            <Pagination.Next onClick={() => loadPage(page + 1)} disabled={page === totPages} />
            <Pagination.Last onClick={() => loadPage(totPages)} />
          </Pagination>
        </div>
      ),
    [page, totPages, loadPage],
  );
}
