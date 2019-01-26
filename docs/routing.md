# Declarative Routing

To enable routing, the app would have a `<Router>` instance at a top-level component, ideally the `<App>`. You will only need to have **one** such instance for the entire app. This is provided by the standard **React Router**, not Reactor Library. You can check the React Router [official documentation](https://reacttraining.com/react-router/core/api/Router) for details.

What Reactor Library does provide is simple, declarative routing that works with React Router.

## The Router Outlet

Admittedly inspired by Angular's approach to routing, Reactor Library provides a _router outlet_ component that dynamically changes content depending on the current route. This is a convenient drop-in replacement for React Router's combination of `<Switch>`, `<Route>` and `<Redirect>` components, and then adds a couple of neat features as well.

### `<RouterOutlet>`

Place this component wherever you need routed views.

```html
<RouterOutlet routes={routes} />
```
where `routes` defines the routes declaratively (see below).

Routing can apply to any level component, so you can place a `<RouterOutlet>` virtually anywhere in the component tree. Similarly, you can have as many nested router outlets as required in the application, particularly when your route paths go from wildcard to specific.

**IMPORTANT:** If your `<RouterOutlet>` and the `<Router>` are not in the same parent component, you would normally need to apply React Router's `withRouter` HOC to the component that renders the `<RouterOutlet>`. This is a requirement of React Router, not of Reactor Library, so please check their documentation for details.

## Defining Routes Declaratively

We use this format when declaring routes:
```javascript
const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/default',
    component: DefaultPage
  },
  {
    path: '/',
    exact: true,
    redirectTo: '/default'
  },
  {
    component: NotFound
  }
];
```

These are the common cases for routes:

- Both `path` and `component` are defined in the route spec. This is straightforward routing.
- No `path` is specified, which means this is the default route if none of the preceding routes matched.
- If `exact` is set to `true`, the `path` has to match exactly.
- If `redirectTo` path is specified instead of `component`, this is a straightforward redirection.

## Protected Routes

Sometimes you need to restrict access to certain routes depending on some conditions. In such cases, you can do something like this:

```javascript
  {
    path: '/default',
    component: DefaultPage,
    canEnter: isAuthenticated,
    fallback: '/login',
  },
```
```javascript
const isAuthenticated = ({ auth }) => auth !== null;
```

If a `canEnter` _guard function_ is defined, the router will only activate the matched route if this function evaluates to `true`. Otherwise, it will route to the `fallback` route. This is useful for apps that require user login to access specific features.

The general form of such guard function is:
```typescript
guardFn = (outletProps: Object, route: Object) => condition: Boolean
```
where `outletProps` accepts all props that were passed to `<RouterOutlet>`, while `route` is a reference to the matched route.

In the example above, the outlet would look like this:
```html
<RouterOutlet routes={routes} auth={token} />
```
so that the `auth` prop is passed to the `isAuthenticated` guard.

## Routing to Lazy Loaded Components

For optimization, feature components can be _lazy loaded_, i.e. they are only fetched by the browser if and when they are required by the app. This technique is also called _code splitting_.

Instead of the normal `import`, use **React Lazy** to import lazy-loaded components.

```javascript
import React, { lazy } from 'react';

const WelcomePage = lazy(() => import('../welcome/WelcomePage'));
```

Then you can optionally tell `<RouterOutlet>` to display a placeholder (e.g. a spinner component) while the component is being loaded. For example:
```html
<RouterOutlet routes={routes} placeholder={<div>...</div>} />
```
where `placeholder` can be any component.

The `<RouterOutlet>` supports routing to such lazy-loaded components by using **React Suspense** internally.

For more information on React Lazy and Suspense, check out the [official documentation](https://reactjs.org/docs/code-splitting.html).

[< Table of Contents](../README.md#reactor-library)
