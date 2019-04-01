import React from 'react';
import './spinner.scss';

export const Spinner = ({children, isLoading}) => (
  <section className='spinner'>
    {
      isLoading && (
        <section className="spinner__element">
          <h4>...Loading</h4>
        </section>
      )
    }
    <section className="spinner__content">
      {
        children
      }
    </section>
  </section>
);
