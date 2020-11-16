import React, { ReactElement } from 'react';
import { queryByAttribute, act, render, fireEvent } from '@testing-library/react';

import { StepFour, componentId, StepFourProps } from './StepFour';

import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';
// import { createClientRender, fireEvent } from 'common/util/render';

const test = testIdBuilder(componentId);
const getById = queryByAttribute.bind(null, 'id');

xdescribe('StepFour', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<StepFourProps>;
  // const render = createClientRender({ strict: false });

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <StepFour onRegister={outputSpy} />;
  });

  const setup = (component: ReactElement) => {
    const utils = render(component);
    const root = utils.getByTestId(test());
    const password = getById(utils.container, test('Password'));
    const confirm = getById(utils.container, test('Confirm'));
    const submit = utils.getByTestId(test('Submit'));

    return { root, password, confirm, submit, ...utils, }
  }

  it('renders component', () => {
    const { root } = setup(component);

    expect(root).toBeInTheDocument();
  });

  it('not calls onRegister if input form is not valid', () => {
    const { password, confirm, submit } = setup(component);
    let call: any;

    fireEvent.click(submit);

    call = outputSpy.mock.calls[0]; // "calls[0] is undefined" means no call was fired 

    expect(outputSpy).toHaveBeenCalledTimes(0);
    expect(call).toBeUndefined();
  });

  // TODO: Fix this test
  // Warning: When testing, code that causes React state updates should be wrapped into act(...)
  // Can't implement this test after use of react-hook-form library...
  it('calls onRegister with password if input form is valid', async () => {
    let call: any;
    const { getByTestId } = render(component);

    await act(async () => {
      fireEvent.input(getByTestId(test('Password')), { target: { value: '1234qwer' } });
      fireEvent.change(getByTestId(test('Confirm')), { target: { value: '1234qwer' } });
      fireEvent.click(getByTestId(test('Submit')));
    });

    call = outputSpy.mock.calls[0][0]; // "calls[0] is undefined" means no call was fired 

    expect(outputSpy).toHaveBeenCalledTimes(1);
    expect(call['password']).toBeDefined();
  });

  // Can't repeat example
  // https://medium.com/@BhargavThakrar/testing-react-component-that-uses-react-hook-form-ad0162d440e
  it("should watch input correctly", async () => {
    const { getByTestId } = render(<StepFour onRegister={outputSpy} />);
    let call: any;
    const newPassword: any = getByTestId(test('Password'));
    const confirmNewPassword = getByTestId(test('Confirm'));
    const submitButton = getByTestId(test('Submit'));

    fireEvent.input(newPassword, { target: { value: '1234qwer' } });
    fireEvent.input(confirmNewPassword, { target: { value: '1234qwer' } });

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect((newPassword as HTMLInputElement).value).toEqual('1234qwer');
    expect((confirmNewPassword as HTMLInputElement).value).toEqual('1234qwer');


    expect(outputSpy.mock.calls[0][0]).toHaveBeenCalledTimes(1);
  });
});