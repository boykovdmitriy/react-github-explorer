import * as React from 'react';
import {shallow} from 'enzyme';
import {Button} from './';

describe('Button', () => {
  it('renders without crashing', () => {
    expect(shallow(<Index/>)).toMatchSnapshot();
  });
});
