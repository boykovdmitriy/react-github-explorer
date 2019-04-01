import React from 'react';
import {Link} from 'react-router-dom';
import {REPOSITORY_ISSUES} from '../../../routes';
import './repositoryItem.scss';

export class RepositoryItem extends React.PureComponent {
  render() {
    const {repository: {name, owner: {login}}} = this.props;

    return (
      <Link
        className="repository-item"
        to={REPOSITORY_ISSUES.url({owner: login, repo: name})}
      >
        {`${login}/${name}`}
      </Link>
    )
  }
}