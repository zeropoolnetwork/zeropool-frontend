import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { componentId, ImportAccount, ImportAccountProps } from './ImportAccount';

describe('ImportAccount', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<ImportAccountProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <ImportAccount onImport={outputSpy} onBack={outputSpy} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });

  describe('Back button', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-BackButton`)).toBeInTheDocument();
    });

    it('should call onCreate prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-BackButton`));

      expect(outputSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Import button', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-ImportButton`)).toBeInTheDocument();
    });

    it('should call onCreate prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-ImportButton`));

      expect(outputSpy).toHaveBeenCalledTimes(1);
    });
  });
});

