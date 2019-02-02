import React from 'react';
import { mount } from 'enzyme';
import { withEffect } from '../../src';

describe('withEffect', () => {
  it('runs the effect after every render', () => {
    const _Counter = () => <div>I count stuff</div>;

    const Counter = withEffect(() => {
      count = count + 1;
    })(_Counter);

    let count = 0;

    const component = mount(<Counter />);
    expect(count).toBe(1);

    component.setState({ forceUpdate: true });
    expect(count).toBe(2);

    component.setState({ forceAnotherUpdate: true });
    expect(count).toBe(3);
  });

  it('runs the effect only once when onlyOnMount argument is true', () => {
    const _Counter = () => <div>I count stuff</div>;

    const Counter = withEffect(() => {
      count = count + 1;
    }, true)(_Counter);

    let count = 0;

    const component = mount(<Counter />);
    expect(count).toBe(1);

    component.setState({ forceUpdate: true });
    expect(count).toBe(1);
  });
});
