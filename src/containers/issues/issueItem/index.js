import React from 'react';

export const IssueItem = ({issue}) => (
  <section>
    <section>{issue.title}</section>
    <section>{issue.user.login}</section>
    <section>{issue.user.created_at}</section>
    <section>{issue.user.updated_at}</section>
    <section>
      {
        issue.assignees.map(x => <section key={x.id}>{x.login}</section>)
      }
    </section>
    <hr />
  </section>
);