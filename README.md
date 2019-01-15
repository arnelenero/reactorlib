# Reactor Library

Reactor Library simplifies React/Redux development, minimizing the required boilerplate to get the job done.

Here are things that Reactor Library can help you work with:

- [Functional Components](#functional-components)
- [Routing](#routing)
- [Redux](#redux)
- [Context](#context)

To install:
```
npm install @reactorlib/core --save
```

# Functional Components

The use of Reactor Library's _higher order components_ (HOCs) encourage the use of _functional components_ (in constrast to _class components_), which are enhanced by injecting data or additional functionality into them. You can, however, also use Reactor Library with your existing class based components.

**Note on React Hooks:** At the time of this writing, the React Hooks API has not been officially released yet. Developers who choose to jump to pure functional components right away will find Reactor Library's HOCs useful while waiting for the Hooks version.

## Enhancing Components by Composition

### `compose`

This Reactor function stacks multiple HOCs and returns a single HOC with the combined effect of all the stacked HOCs.
```javascript
compose(...functions: Array<Function>)(Component)
```
This applies the HOCs passed as arguments, from **right to left** (just like how function nesting works).

For example:
```javascript
export default compose(
  withStore({ session }),
  withStyles(styles)
)(MyComponent);
```

## Adding State to Functional Components

To circumvent the _stateless_ nature of functional components, where all you define are props, you would need to inject internal state into the component as props.

### `withState`

This HOC provides state and makes it available within the component function as a prop. It is used as a regular prop, except that it also behaves as an internal state, i.e. changing its value will re-render the component. For this reason, we will refer to it as a _state prop_.
```javascript
withState(state: String, initialValue: any)
```
Apart from the state prop itself, `withState` also injects the corresponding updater function for the state. Just as with class components, we need some sort of `this.setState()`to properly update a state prop of our functional component. In this case it is named after the state prop, e.g. for state prop called `email`, the updater function is called `setEmail`. Since it is also injected, we can refer to it as _updater prop_.

Example usage:
```javascript
export default compose(
  withState('email', ''),
  withState('password', '')
)(LoginForm);
```

In this example, within `LoginForm` the state props and their corresponding updaters are accessible as follows:
```javascript
const LoginForm = ({ email, setEmail, password, setPassword }) => {
  // Define component here
}
```

## Effects as Alternative to Lifecycle Methods

Functional components by nature do not have lifecycle methods. However, we can still implement routines that need to run whenever the component mounts, updates or unmounts using _effects_.

### `withEffect`
...

# Routing

To enable routing, the app would have a `<Router>` instance at a top-level component, ideally the `<App>`. You will only need to have **one** such instance for the entire app. This is provided by the standard `react-router`, not Reactor Library. You can check the `react-router` [official documentation](https://reacttraining.com/react-router/core/api/Router) for details.

What Reactor Library does provide is simple, declarative routing that works with  `react-router`.

## The Router Outlet

Admittedly inspired by Angular's approach to router, Reactor Library provides a _router outlet_ component that is a convenient drop-in replacement for `react-router`'s combination of `<Switch>`, `<Route>` and `<Redirect>` components, that adds a couple of neat features as well.

### `<RouterOutlet>`

Place this component wherever you need routed views.
```html
<RouterOutlet routes={routes} />
```
Routing can apply to any level component, so you can place a `<RouterOutlet>` virtually anywhere in the component tree.

## Defining Routes

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

```javascript
    {
      path: '/default',
      component: DefaultPage,
      canEnter: isAuthenticated,
      fallback: '/login',
    },
```
If a `canEnter` guard function is defined, the router will only activate the matched route if this function evaluates to `true`. Otherwise, it will route to the `fallback` route. This is useful for apps that require user login to access specific features.

## Routing to Lazy Loaded Components

For optimization, feature components can be _lazy loaded_, i.e. they are only fetched by the browser if and when they are required by the app. This technique is also called _code splitting_.

Instead of the normal `import`, use **React Lazy** to import lazy-loaded components.
```javascript
import React, { lazy } from 'react';

const WelcomePage = lazy(() => import('../welcome/WelcomePage'));
```
The `<RouterOutlet>` supports routing to such lazy-loaded components by using React Suspense internally.

For more information on React Lazy and Suspense, check out the [official documentation](https://reactjs.org/docs/code-splitting.html).
