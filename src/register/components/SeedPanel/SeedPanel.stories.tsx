import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SeedPanel } from './SeedPanel';

const decoratorCss = { align: 'senter', padding: '3rem' };

export default {
  title: 'SeedPanel',
  component: SeedPanel,
  decorators: [(panel: any) => <div style={decoratorCss}>{panel()}</div>],
};

const Template: Story<ComponentProps<typeof SeedPanel>> = (args) => (
  <SeedPanel {...args} />
);

export const PanelEmpty = Template.bind({});
PanelEmpty.args = {
  seed: [],
};

export const PanelInShowMode = Template.bind({});
PanelInShowMode.args = {
  seed: ['one', 'two', 'three'],
};