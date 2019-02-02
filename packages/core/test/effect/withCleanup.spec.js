import React from 'react';
import { mount } from 'enzyme';
import { withCleanup } from '../../src';

describe('withEffect', () => {
  it('runs the cleanup when unmounting', () => {
    const _Counter = () => <div>I count stuff</div>;

    const Counter = withCleanup(() => {
      count = 0;
    })(_Counter);

    let count = 100;

    const component = mount(<Counter />);
    component.unmount();
    expect(count).toBe(0);
  });
});
