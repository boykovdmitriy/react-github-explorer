import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {repositoriesActions} from '../../redux/repositories';
import {ROOT} from '../../routes';
import './issues.scss';
import {IssueItem} from './issueItem';
import {SelectAssignee} from './selectAssignee';
import {Button} from '../../components/button';

const mapStateToProps = (state) => ({
  assignedPersonsResponse: state.indexAssignedPersons,
  repositoryIssuesResponse: state.indexRepositoryIssues,
});

const mapDispatchToProps = {
  fetchAssignedPersons: repositoriesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.request,
  fetchIssues: repositoriesActions.GET_REPOSITORY_ISSUES.request,
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
          assignee: assignee && assignee.login
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

  handleAssigneeFetch = () => {
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

  hasMore = (storeField) => {
    const {
      params: {
        page = {page: 1}
      },
      totalPages,
    } = storeField;

    return page < totalPages;
  };

  renderListOfIssues = () => {
    const {
      repositoryIssuesResponse,
      repositoryIssuesResponse: {
        data, isLoaded
      },
    } = this.props;

    if (isLoaded && data.length === 0) {
      return (<span>Issues not found</span>);
    }
    if (!isLoaded) {
      return (<span>...Loading</span>);
    }

    return (
      <InfiniteScroll
        dataLength={data.length}
        loader={<h4>Loading...</h4>}
        next={this.handleLoadRepositoryIssues}
        hasMore={this.hasMore(repositoryIssuesResponse)}
        endMessage={
          <p style={{textAlign: 'center'}}>
            end of data
          </p>
        }
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
            onFetch={this.handleAssigneeFetch}
            value={selectedAssignee}
            isLoading={assignedPersonsResponse.isLoading}
            hasMore={this.hasMore(assignedPersonsResponse)}
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