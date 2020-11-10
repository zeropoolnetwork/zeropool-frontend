import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { SeedPanel, componentId, SeedPanelProps } from './SeedPanel';
import { deepFreeze } from 'common/util/deep-freeze';

describe('SeedPanel', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<SeedPanelProps>;
  let seed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <SeedPanel seed={deepFreeze(seed)} check={false} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
