import React from 'react';
import {debounce} from 'lodash'
import {connect} from 'react-redux';
import './searchRepository.scss';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import {repositoriesActions} from '../../redux/repositories';

const mapStateToProps = (state) => ({
  repositoriesSearchResponse: state.repositories,
});

const mapDispatchToProps = {
  searchRepositoriesRequest: repositoriesActions.SEARCH_REPOSITORY.request,
};

class SearchRepositoryContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.throttledFetchRepositories = debounce(this.fetchRepositories, 600);
    this.state = {
      query: '',
    }
  }

  fetchRepositories = (query) => {
    const {searchRepositoriesRequest} = this.props;
    searchRepositoriesRequest({params: {q: query, page: 1}});
  };

  queryChanged = ({target: {value}}) => {
    this.setState({
      query: value,
    }, () => {
      this.throttledFetchRepositories(value);
    })
  };

  render() {
    const {query} = this.state;
    return (
      <section>
        <section>
          <Input
            type='text'
            onChange={this.queryChanged}
            value={query}
          />
          <Button>search</Button>
        </section>
      </section>
    );
  }
}

export const SearchRepository = connect(mapStateToProps, mapDispatchToProps)(SearchRepositoryContainer);