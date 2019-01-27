# Functional Components

The use of Reactor Library's _higher order components_ (HOCs) encourage the use of _functional components_ (in constrast to _class components_), which are enhanced by injecting data or additional functionality into them. You can, however, also use Reactor Library with your existing class based components.

**Note on React Hooks:** At the time of this writing, the React Hooks API has not been officially released yet. Developers who choose to jump to pure functional components right away will find Reactor Library's HOCs useful while waiting for the Hooks version.

## Enhancing Components by Composition

### `compose`

This function stacks multiple HOCs and returns a single HOC with the combined effect of all the stacked HOCs.

```typescript
compose(...functions)(Component)
```

This applies the HOCs passed as arguments, from **right to left** (just like how function nesting works).

Using this format makes stacked HOCs more readable and easier to rearrange, especially since typical HOCs are _parameterized_, i.e. they are actually functions that take some argument(s) and return the actual HOC.

For example:
```javascript
const MyComponent = compose(
  withStore({ session }),
  withStyles(styles)
)(BaseComponent);
```

The above is just a better way of presenting this:
```javascript
const MyComponent = withStore({ session })(withStyles(styles)(BaseComponent))
```

The `compose` function is a very common _functional programming_ utility, and therefore if you are already familiar with the `compose` function from other libraries like Redux, this does exactly the same thing. While you are unlikely to import Reactor Library just for this function, it is provided here for convenience of using it with HOCs that Reactor Library provides.

## Adding State to Functional Components

To circumvent the _stateless_ nature of functional components, where all you define are props, you would need to inject internal state into the component as props.

### `withState`

This HOC provides state and makes it available within the component function as an additional prop. 

```typescript
withState(state: string, initialValue: any)
```

The injected prop is just like a regular prop, except that it also behaves as an internal state, i.e. changing its value will re-render the component. For this reason, we will refer to it as a _state prop_.

Apart from the state prop itself, `withState` also injects the corresponding updater function for the state. This is the equivalent of `this.setState()` in class components. In this case it is named after the state prop, e.g. for state prop called `email`, the updater function is called `setEmail()`. Since it is also injected, we can refer to it as _updater prop_.

Example usage:
```javascript
compose(
  withState('email', ''),
  withState('password', '')
)(LoginForm);
```

In this example, within `LoginForm` the state props and their corresponding updaters are accessible as follows:
```javascript
const LoginForm = ({ email, setEmail, password, setPassword }) => {
  const handleChangeEmail = event => setEmail(event.target.value);
  // ... and so on
}
```

## Effects as Alternative to Lifecycle Methods

Functional components by nature do not have lifecycle methods. However, we can still implement routines that need to run whenever the component renders, mounts or unmounts using _effects_ and _cleanup_.

### `withEffect`

This HOC injects a function into the component such that it gets executed whenever the component renders, or only when it mounts. 

```typescript
withEffect(effect: Function, onlyOnMount?: boolean)
```

This allows you to run code that would otherwise be unsafe to do inside the main body of the function component, such as state mutations, timers, async operations and similar side effects.

The `effect` argument is a function of this form:
```javascript
props => { doSomething() }
```
Note that `withEffect` passes the (optional) `props` of the component to the function.

When `onlyOnMount` is set to `true`, this is the direct alternative to `componentDidMount()`. Otherwise, it behaves like running the effect inside both `componentDidMount()` and `componentDidUpdate()`.

### `withCleanup`

This HOC works similar to `withEffect` except that it gets executed when the component unmounts. 

```typescript
withCleanup(cleanup: Function)
```

This allows you to perform necessary teardown code, such as cancelling ongoing async operations and clearing timers that would otherwise cause errors when their callback fires while the component is already gone.

The `cleanup` argument is a function of this form:
```javascript
props => { doSomething() }
```
Note that `withCleanup` passes the (optional) `props` of the component to the function.

### Example usage of effects and cleanup

```javascript
const Timer = compose(
  withEffect(doFetchConfig, true),
  withEffect(updateTimer),
  withCleanup(clearTimer)
)(BaseTimer);
```

In this example, the combination of effects and cleaup will have the net effect of performing an async `doFetchConfig(props)` when `<Timer>` mounts, calling `updateTimer(props)` on mount and every re-render thereafter, then finally `clearTimer(props)` once the component unmounts.

[< Table of Contents](../README.md#reactor-library)
