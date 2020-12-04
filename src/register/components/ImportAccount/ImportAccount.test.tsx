import React, { ReactElement } from 'react';

import { componentId, ImportAccount, ImportAccountProps } from './ImportAccount';

import { createClientRender, queryByAttribute } from 'common/util/render';
import { testIdBuilder } from 'common/helpers/test/test-id-builder.helper';

const test = testIdBuilder(componentId);
const getById = queryByAttribute.bind(null, 'id');

describe('ImportAccount', () => {
  let outputSpy: jest.Mock;
  let component: React.ReactElement<ImportAccountProps>;
  const render = createClientRender({ strict: false });

  beforeEach(() => {
    outputSpy = jest.fn();
    component = <ImportAccount onImport={outputSpy} onBack={outputSpy} />;
  });

  const setup = (component: ReactElement) => {
    const utils = render(component);
    const root = utils.getByTestId(test());
    const seed = getById(utils.container, test('Seed'));
    const password = getById(utils.container, test('Password'));
    const confirm = getById(utils.container, test('Confirm'));
    const submit = utils.getByTestId(test('Import'));

    return { root, seed, password, confirm, submit, ...utils }
  }

  it('renders', () => {
    const { getByTestId } = setup(component);

    expect(getByTestId(test())).toBeInTheDocument();
  });
});
