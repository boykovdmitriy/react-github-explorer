import React from 'react';
import {debounce, isEmpty} from 'lodash'
import {connect} from 'react-redux';
import {Input} from '../../components/input';
import {repositoriesActions} from '../../redux/repositories';

import {RepositoryList} from './repositoryList';
import './searchRepository.scss';

const mapStateToProps = (state) => ({
  repositoriesSearchResponse: state.searchRepositories,
});

const mapDispatchToProps = {
  searchRepositoriesRequest: repositoriesActions.SEARCH_REPOSITORY.request,
};

class SearchRepositoryContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const {repositoriesSearchResponse: {params: {q}}} = props;

    this.throttledFetchRepositories = debounce(this.fetchRepositories, 600);
    this.state = {
      query: q || '',
    }
  }

  fetchRepositories = (query, page = 1) => {
    const {searchRepositoriesRequest} = this.props;
    const params = {page};

    if (!isEmpty(query)) {
      params.q = query;
    }

    searchRepositoriesRequest({params});
  };

  queryChanged = ({target: {value}}) => {
    this.setState({
      query: value,
    }, () => {
      this.throttledFetchRepositories(value);
    });
  };

  handleLoadMoreRepositories = () => {
    const {
      repositoriesSearchResponse: {params: {page}}
    } = this.props;
    const {query} = this.state;
    this.fetchRepositories(query, page + 1);
  };

  render() {
    const {query} = this.state;
    const {repositoriesSearchResponse} = this.props;
    return (
      <section className="search-repository">
        <section className="search-repository__container">
          <section className="search-repository__search">
            <Input
              type='text'
              onChange={this.queryChanged}
              value={query}
              placeholder="Type a repository name"
            />
          </section>
          <section className="search-repository__list">
            <RepositoryList
              repositoriesSearchResponse={repositoriesSearchResponse}
              handleEndReached={this.handleLoadMoreRepositories}
            />
          </section>
        </section>
      </section>
    );
  }
}

export const SearchRepository = connect(mapStateToProps, mapDispatchToProps)(SearchRepositoryContainer);