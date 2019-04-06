import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {hasMorePages} from '../../../utils/hasMore';
import {Spinner} from '../../../components/spinner';
import {InfiniteScrollEndMessage} from '../../../components/infiniteScrollEndMessage';
import {RepositoryItem} from '../repositoryItem';

export const RepositoryList = ({
                                 repositoriesSearchResponse,
                                 handleEndReached
                               }) => (
  <InfiniteScroll
    dataLength={repositoriesSearchResponse.data.length}
    loader={<Spinner/>}
    next={handleEndReached}
    hasMore={hasMorePages(repositoriesSearchResponse)}
    endMessage={(
      <InfiniteScrollEndMessage
        isLoading={repositoriesSearchResponse.isLoading}
        hasData={repositoriesSearchResponse.data.length > 0}
      />
    )}
  >
    {
      repositoriesSearchResponse
        .data
        .map(x => <RepositoryItem key={x.id} repository={x}/>)
    }
  </InfiniteScroll>
);
