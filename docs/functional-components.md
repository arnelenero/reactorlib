# Functional Components

The use of Reactor Library's _higher order components_ (HOCs) encourage the use of _functional components_ (in constrast to _class components_), which are enhanced by injecting data or additional functionality into them. You can, however, also use Reactor Library with your existing class based components.

**Note on React Hooks:** The React Hooks API has been officially released, and Reactor Library will soon follow suit with the hook version of most of its HOCs. However, depending on the specific use-case, some developers might still prefer/need to use HOCs over hooks. It looks like in some cases HOCs can be significantly faster than Hooks (see [this article](https://medium.com/@aenero/react-hooks-slower-than-hoc-ff105586036) which compares Hooks performance to Reactor Library HOCs).

## Enhancing Components by Composition

### `compose`

This function stacks multiple HOCs and returns a single HOC with the combined effect of all the stacked HOCs.

```typescript
compose(...functions)(Component)
```

This applies the HOCs passed as arguments, from **right to left** (just like how function nesting works).

Using this format makes stacked HOCs more readable and easier to rearrange, especially since typical HOCs are _parameterized_, i.e. they are actually functions that take some argument(s) and return the actual HOC.

#### Example usage

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

This HOC provides component state and makes it accessible within the component function as additional props. 

```typescript
withState(state: Object)
```

The `state` argument consists of key-value pairs that define both the structure of the state and its initial value. Each key in `state` will be injected as a separate prop into the component.

Each injected prop is just like a regular prop, except that it also behaves as an internal state, i.e. changing its value will re-render the component. For this reason, we will refer to it as a _state prop_.

Apart from the state props, `withState` also injects the corresponding updater functions for them. The names are based on the state props, e.g. for state prop called `email`, the updater function is called `setEmail`. We can refer to each updater function injected to the component as an _updater prop_.

An updater prop has the following signature:

```typescript
setState(newValue)
```
assuming the corresponding state prop is named `state`.

#### Example usage

```javascript
withState({
  email: '',
  password: ''
})(LoginForm);
```

In this example, within `LoginForm` the state props and their corresponding updaters are accessible as follows:
```javascript
const LoginForm = ({ email, setEmail, password, setPassword }) => {
  const handleChangeEmail = event => setEmail(event.target.value);
  // ... and so on
}
```

#### Calculating state based on current value

Due to how React works (batching or deferring state changes as it sees fit), if you need to calculate the new state value based on the current value, it is considered unreliable to do such calculations by direct reference to the state prop within the component itself. 

For this reason, the `value` argument for the updater prop can be a function that has this signature:
```typescript
(currentValue) => newValue
```
This is lazy evaluated at the actual time the state change is being applied by React, so you are sure that the `currentValue` is really "current".

#### Setting initial value based on props

Sometimes, the initial value of the state prop needs to be calculated based on the component's props. For this purpose, the `initialValue` argument of `withState` can be a function with this signature:
```typescript
(props: Object) => initialValue
```
where `props` is a reference to the component props object.

## Effects as Alternative to Lifecycle Methods

Functional components by nature do not have lifecycle methods. However, we can still implement routines that need to run whenever the component renders, mounts or unmounts using _effects_ and _cleanup_.

### `withEffect`

This HOC injects a function into the component such that it gets called each time the component renders, or only once when it mounts. 

```typescript
withEffect(effect: Function, onlyOnMount?: boolean)
```

This allows you to run code that would otherwise be unsafe to do inside the main body of the function component, such as state mutations, timers, async operations and similar side effects.

The `effect` argument is a function of this form:
```javascript
props => { doSomething() }
```
Note that `withEffect` passes the `props` of the component to the function.

When `onlyOnMount` is set to `true`, this is the direct alternative to `componentDidMount` of class components. Otherwise, it behaves like running the effect inside both `componentDidMount` and `componentDidUpdate`.

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
Note that `withCleanup` passes the `props` of the component to the function.

The cleanup function is the direct alternative to `componentWillUnmount` of class components.

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
