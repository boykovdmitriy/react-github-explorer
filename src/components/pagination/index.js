import React from 'react';
import {Button} from '../button';

export const Pagination = ({total, current, onSelect}) => (
  <section>
    <Button
      disabled={current <= 1}
      onClick={() => {
        onSelect(current - 1)
      }}
    >
      prev
    </Button>
    <section>{`${current}/${total}`}</section>
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