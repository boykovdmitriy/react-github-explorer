import React from 'react';
import './issueItem.scss';

export const IssueItem = ({issue}) => (
  <section className='issue-item'>
    <h4 className="issue-item__title">{issue.title}</h4>
    <section className="issue-item__author">Author: {issue.user.login}</section>
    <section className="issue-item__assigned">
      Assigned persons:
      {
        issue.assignees.length === 0 ?
          'no assigned persons'
          :
          issue.assignees.map(x => x.login).join(', ')
      }
    </section>
  </section>
);