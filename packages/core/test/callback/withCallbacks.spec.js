import React from 'react';
import { mount } from 'enzyme';
import { withCallbacks } from '../../src';

describe('withCallbacks', () => {
  it('injects callbacks to base component', () => {
    let submitted = false;
    let clicked = false;

    const _Form = ({ handleSubmit, handleClick }) => (
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleClick}>
          Click Me
        </button>
        <button type="submit">Submit</button>
      </form>
    );

    const Form = withCallbacks({
      handleSubmit: props => event => {
        submitted = true;
      },
      handleClick: props => event => {
        clicked = true;
      },
    })(_Form);

    const component = mount(<Form />);
    const form = component.find('form');
    const button = component.find('button[type="button"]');

    button.simulate('click');
    expect(clicked).toBe(true);

    form.simulate('submit');
    expect(submitted).toBe(true);
  });
});
