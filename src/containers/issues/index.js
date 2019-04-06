import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {issuesActions} from '../../redux/issues';
import {ROOT} from '../../routes';
import {SelectAssignee} from './selectAssignee';
import {Button} from '../../components/button';
import {hasMorePages} from '../../utils/hasMore';
import {IssueList} from './issueList';

import './issues.scss';

const mapStateToProps = (state) => ({
  assignedPersonsResponse: state.indexAssignedPersons,
  repositoryIssuesResponse: state.indexRepositoryIssues,
});

const mapDispatchToProps = {
  fetchAssignedPersons: issuesActions.GET_ASSIGNED_TO_ISSUES_PERSONS.request,
  fetchIssues: issuesActions.GET_REPOSITORY_ISSUES.request,
};

class IssuesContainer extends React.PureComponent {
  state = {
    selectedAssignee: null,
  };

  componentDidMount() {
    const {match: {params: {owner, repo}}, fetchAssignedPersons} = this.props;
    fetchAssignedPersons({owner, repo, params: {page: 1}});
    this.loadFilteredListOfIssues();
  }

  loadFilteredListOfIssues = ({assignee, page = 1} = {}) => {
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
      this.loadFilteredListOfIssues({assignee});
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

    this.loadFilteredListOfIssues({assignee: selectedAssignee, page: page + 1});
  };

  render() {
    const {
      match: {
        params: {repo}
      },
      repositoryIssuesResponse,
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
          <IssueList
            repositoryIssuesResponse={repositoryIssuesResponse}
            handleEndReached={this.handleLoadRepositoryIssues}
          />
        </section>
      </section>
    );
  }
}

export const Issues = connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);