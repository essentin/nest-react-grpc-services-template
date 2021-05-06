/* eslint-disable global-require */
import { guestRoutes } from './guestRoutes';
import { hostRoutes } from './hostRoutes';
import { adminRoutes } from './adminRoutes';
import { commonRoutes } from './commonRoutes';

let children = [];
children = children.concat(guestRoutes, hostRoutes, adminRoutes, commonRoutes);

// The top-level (parent) route
export default {
  path: '/',

  // Keep in mind, routes are evaluated in order
  children,

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};