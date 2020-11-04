import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { Welcome, componentId, WelcomeProps } from './Welcome';

describe('Welcome Page', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<WelcomeProps>;
  afterEach(cleanup);

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <Welcome onAbout={outputSpy} onCreate={outputSpy} onImport={outputSpy} />;
  });

  it('should render component', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(componentId)).toBeInTheDocument();
  });


  it('should render greeteng', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(`${componentId}-Greeting`)).toBeInTheDocument();
  })

  it('should render description', () => {
    const { getByTestId } = render(component);

    expect(getByTestId(`${componentId}-Description`)).toBeInTheDocument();
  });

  describe('Create button', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-CreateButton`)).toBeInTheDocument();
    });

    it('should call onCreate prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-CreateButton`));

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

  describe('About button', () => {
    it('should render', () => {
      const { getByTestId } = render(component);

      expect(getByTestId(`${componentId}-AboutButton`)).toBeInTheDocument();
    });

    it('should call onCreate prop callback when clicked', () => {
      const { getByTestId } = render(component);
      fireEvent.click(getByTestId(`${componentId}-AboutButton`));

      expect(outputSpy).toHaveBeenCalledTimes(1);
    });
  });
});
