import React from 'react';
import {debounce} from 'lodash'
import {connect} from 'react-redux';
import './searchRepository.scss';
import {Input} from '../../components/input';
import {Spinner} from '../../components/spinner';
import {repositoriesActions} from '../../redux/repositories';
import {RepositoryItem} from './repositoryItem';
import {Pagination} from '../../components/pagination';

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
    searchRepositoriesRequest({params: {q: query, page}});
  };

  queryChanged = ({target: {value}}) => {
    this.setState({
      query: value,
    }, () => {
      this.throttledFetchRepositories(value);
    })
  };

  handlePageChanged = (page) => {
    const {query} = this.state;
    this.fetchRepositories(query, page);
    window.scrollTo(0, 0);
  };

  render() {
    const {query} = this.state;
    const {
      repositoriesSearchResponse: {
        isLoading,
        isLoaded,
        data: {items = []},
        totalPages,
        params: {page}
      }
    } = this.props;
    return (
      <section
        className="search-repository"
      >
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
            <Spinner
              isLoading={isLoading}
            >
              {
                items.map(x => <RepositoryItem key={x.id} repository={x}/>)
              }
            </Spinner>
          </section>
          <section className="search-repository__list-pagination">
            {
              isLoaded && (
                <Pagination
                  total={totalPages}
                  current={page}
                  onSelect={this.handlePageChanged}
                />
              )
            }
          </section>
        </section>
      </section>
    );
  }
}

export const SearchRepository = connect(mapStateToProps, mapDispatchToProps)(SearchRepositoryContainer);