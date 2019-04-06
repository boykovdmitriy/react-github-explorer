import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {issuesActions} from '../../redux/issues';
import {ROOT} from '../../routes';
import {IssueItem} from './issueItem';
import {SelectAssignee} from './selectAssignee';
import {Button} from '../../components/button';
import {hasMorePages} from '../../utils/hasMore';

import './issues.scss';
import {InfiniteScrollEndMessage} from '../../components/infiniteScrollEndMessage';
import {Spinner} from '../../components/spinner';

const mapStateToProps = (state) => ({
  assignedPersonsResponse: state.indexAssignedPersons,
  repositoryIssuesResponse: state.indexRepositoryIssues,
});

const mapDispatchToProps = {
  fetchAssignedPersons: issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.request,
  fetchIssues: issuesActions.GET_REPOSITORY_ISSUES.request,
};

export class IssuesContainer extends React.PureComponent {
  state = {
    selectedAssignee: null,
  };

  componentDidMount() {
    const {match: {params: {owner, repo}}, fetchIssues, fetchAssignedPersons} = this.props;
    fetchAssignedPersons({owner, repo, params: {page: 1}});
    fetchIssues({owner, repo, params: {page: 1}});
  }

  filterListByAssignee = (assignee, page = 1) => {
    const {match: {params: {owner, repo}}, fetchIssues} = this.props;
    if (assignee) {
      fetchIssues({
        owner,
        repo,
        params: {
          page,
          assignee: assignee.login
        }
      });
      return;
    }
    fetchIssues({owner, repo, params: {page}});
  };

  handleSelect = (assignee) => {
    this.setState({
      selectedAssignee: assignee,
    }, () => {
      this.filterListByAssignee(assignee);
    });
  };

  handleLoadMoreAssignee = () => {
    const {
      match: {params: {owner, repo}},
      fetchAssignedPersons,
      assignedPersonsResponse: {params}
    } = this.props;
    fetchAssignedPersons({
      owner, repo, params: {page: params.page + 1}
    });
  };

  handleLoadRepositoryIssues = () => {
    const {selectedAssignee} = this.props;
    const {repositoryIssuesResponse: {params: {page}}} = this.props;

    this.filterListByAssignee(selectedAssignee, page + 1);
  };

  renderListOfIssues = () => {
    const {
      repositoryIssuesResponse,
      repositoryIssuesResponse: {
        data, isLoading
      },
    } = this.props;

    return (
      <InfiniteScroll
        dataLength={data.length}
        loader={<Spinner/>}
        next={this.handleLoadRepositoryIssues}
        hasMore={hasMorePages(repositoryIssuesResponse)}
        endMessage={(
          <InfiniteScrollEndMessage
            isLoading={isLoading}
            hasData={data.length > 0}
          />
        )}
      >
        {
          data
            .map(x => <IssueItem key={x.id} issue={x}/>)
        }
      </InfiniteScroll>
    );
  };

  render() {
    const {
      match: {
        params: {repo}
      },
      assignedPersonsResponse,
    } = this.props;
    const {selectedAssignee} = this.state;

    return (
      <section className="issues">
        <header className="issues__header">
          <Button size='sm' component={Link} to={ROOT.url()}>Back</Button>
          <h1 className="issues__repo-name">{repo}</h1>
        </header>
        <section className="issues__filter">
          <SelectAssignee
            items={assignedPersonsResponse.data}
            onSelect={this.handleSelect}
            onFetch={this.handleLoadMoreAssignee}
            value={selectedAssignee}
            isLoading={assignedPersonsResponse.isLoading}
            hasMore={hasMorePages(assignedPersonsResponse)}
          />
        </section>
        <section>
          {this.renderListOfIssues()}
        </section>
      </section>
    );
  }
}

export const Issues = connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);