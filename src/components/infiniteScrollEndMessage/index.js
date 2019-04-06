import React from 'react';
import {Spinner} from '../spinner';

export const InfiniteScrollEndMessage = ({isLoading, hasData}) => (
  <section>
    {
      isLoading && !hasData && (
        <Spinner/>
      )
    }
    {
      !isLoading && hasData && (
        <p style={{textAlign: 'center'}}>
          end of data
        </p>
      )
    }
    {
      !isLoading && !hasData && (
        <p style={{textAlign: 'center'}}>
          empty list
        </p>
      )
    }
  </section>
);
