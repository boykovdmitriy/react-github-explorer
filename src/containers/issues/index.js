import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {repositoriesActions} from '../../redux/repositories';
import {ROOT} from '../../routes';
import './issues.scss';
import {IssueItem} from './issueItem';
import {SelectAssignee} from './selectAssignee';

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

  filterListByAssignee = (assignee) => {
    const {match: {params: {owner, repo}}, fetchIssues} = this.props;
    if (assignee) {
      fetchIssues({
        owner,
        repo,
        params: {
          page: 1,
          assignee: assignee && assignee.login
        }
      });
      return;
    }
    fetchIssues({
      owner,
      repo,
      params: {
        page: 1,
      }
    });
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
      owner, repo, params: {page: params.params.page + 1}
    });
  };

  render() {
    const {
      match: {
        params: {repo}
      },
      assignedPersonsResponse,
      assignedPersonsResponse: {
        params: {
          params: {page} = {page: 1}
        },
        totalPage,
      },
      repositoryIssuesResponse,
    } = this.props;
    const {selectedAssignee} = this.state;

    const hasMore = page <= totalPage;
    return (
      <section>
        <section>
          <Link to={ROOT.url()}>Back</Link>
          <h1>{repo}</h1>
        </section>
        <section>
          <SelectAssignee
            items={assignedPersonsResponse.data}
            onSelect={this.handleSelect}
            onFetch={this.handleAssigneeFetch}
            value={selectedAssignee}
            isLoading={assignedPersonsResponse.isLoading}
            hasMore={hasMore}
          />
        </section>
        <section>
          {
            repositoryIssuesResponse.data.map(x => <IssueItem key={x.id} issue={x}/>)
          }
        </section>
      </section>
    );
  }
}

export const Issues = connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);