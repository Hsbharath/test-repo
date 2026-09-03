import type { ComponentType } from 'react';
import UsersPage from './pages/UsersPage';
import CommentsPage from './pages/CommentsPage';
import ToDoPage from './pages/ToDoPage';
import NestedCheckboxes from './components/NestedCheckboxes';
import IndeterminateState from './components/IndeterminateState';
import NestedFetchofJobs from './pages/NestedFetchofJobs';

export interface PageConfig {
  path: string;
  navLabel: string;
  title: string;
  question: string;
  Component: ComponentType;
}

export const pages: PageConfig[] = [
  {
    path: '/',
    navLabel: 'Users',
    title: 'Grouped User Directory',
    question:
      'Fetch a list of users and render them grouped by country. Include a live search box that filters the list by name as the user types, without losing the grouping.',
    Component: UsersPage,
  },
  {
    path: '/comments',
    navLabel: 'Comments',
    title: 'Paginated Comments',
    question:
      'Fetch a large list of comments from an API and display them in pages of 10. Provide page-number controls that let the user jump directly to any page.',
    Component: CommentsPage,
  },
  {
    path: '/todos',
    navLabel: 'Todos',
    title: 'Todo List with Progress',
    question:
      'Fetch a todo list, paginate it, and let the user toggle each item as complete. Show a running count of completed vs. remaining todos outside the list itself.',
    Component: ToDoPage,
  },
  {
    path: '/nested-checkboxes',
    navLabel: 'Nested Checkboxes',
    title: 'Nested Checkbox Tree',
    question:
      'Build a checkbox tree where checking a parent checks every descendant, and checking/unchecking a child updates its ancestors. Display the list of currently checked labels below the tree.',
    Component: NestedCheckboxes,
  },
  {
    path: '/indeterminate-state',
    navLabel: 'Indeterminate State',
    title: 'Indeterminate Checkbox State',
    question:
      'Extend a checkbox tree so a parent shows the native "indeterminate" visual state whenever only some (not all) of its descendants are checked, recalculated on every render.',
    Component: IndeterminateState,
  },
  {
    path: '/job-board',
    navLabel: 'Job Board',
    title: 'Nested Async Job Board',
    question:
      'Fetch a list of job story IDs from the Hacker News API, then for each ID fetch its full details independently, rendering each job as soon as its own request resolves.',
    Component: NestedFetchofJobs,
  },
];
