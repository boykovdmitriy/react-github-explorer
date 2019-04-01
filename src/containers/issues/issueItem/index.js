import React from 'react';
import './issueItem.scss';

function buildAssignedPersonsString(assignees) {
  const assignedPersons = assignees.length === 0 ?
    'no assigned persons'
    :
    assignees.map(x => x.login).join(', ');
  return `Assigned persons: ${assignedPersons}`
}

export const IssueItem = ({issue}) => (
  <section className='issue-item'>
    <h4 className="issue-item__title">{issue.title}</h4>
    <section className="issue-item__author">Author: {issue.user.login}</section>
    <section className="issue-item__assigned">
      {
        buildAssignedPersonsString(issue.assignees)
      }
    </section>
  </section>
);