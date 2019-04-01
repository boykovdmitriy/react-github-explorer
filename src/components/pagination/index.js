import React from 'react';
import {Button} from '../button';
import './pagination.scss';

export const Pagination = ({total, current, onSelect}) => (
  <section className='pagination'>
    <Button
      disabled={current <= 1}
      onClick={() => {
        onSelect(current - 1)
      }}
    >
      prev
    </Button>
    <section className="pagination__value">
      {`${current}/${total}`}
    </section>
    <Button
      disabled={current >= total}
      onClick={() => {
        onSelect(current + 1)
      }}
    >
      next
    </Button>
  </section>
);