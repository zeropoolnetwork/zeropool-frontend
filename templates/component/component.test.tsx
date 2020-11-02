import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { TemplateName, componentId, TemplateNameProps } from './TemplateName';

describe('TemplateName', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<TemplateNameProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <TemplateName />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  })
});
