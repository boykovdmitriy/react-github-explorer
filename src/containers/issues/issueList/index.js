import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {hasMorePages} from '../../../utils/hasMore';
import {Spinner} from '../../../components/spinner';
import {InfiniteScrollEndMessage} from '../../../components/infiniteScrollEndMessage';
import {IssueItem} from '../issueItem';

export const IssueList = ({
                            repositoryIssuesResponse,
                            handleEndReached,
                          }) => (
  <InfiniteScroll
    dataLength={repositoryIssuesResponse.data.length}
    loader={<Spinner/>}
    next={handleEndReached}
    hasMore={hasMorePages(repositoryIssuesResponse)}
    endMessage={(
      <InfiniteScrollEndMessage
        isLoading={repositoryIssuesResponse.isLoading}
        hasData={repositoryIssuesResponse.data.length > 0}
      />
    )}
  >
    {
      repositoryIssuesResponse.data
        .map(x => <IssueItem key={x.id} issue={x}/>)
    }
  </InfiniteScroll>
);
