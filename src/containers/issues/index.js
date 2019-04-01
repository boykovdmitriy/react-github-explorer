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
  componentDidMount() {
    const {match: {params: {owner, repo}}, fetchIssues, fetchAssignedPersons} = this.props;
    fetchAssignedPersons({owner, repo, params: {page: 1}});
    fetchIssues({owner, repo, params: {page: 1}});
  }

  handleSelect = () => {

  };

  handleAssigneeFetch = () => {

  };

  render() {
    const {
      match: {
        params: {repo}
      },
      assignedPersonsResponse,
      repositoryIssuesResponse,
    } = this.props;

    console.log(repositoryIssuesResponse.data.map(issue => issue.assignees));
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
            hasMore
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