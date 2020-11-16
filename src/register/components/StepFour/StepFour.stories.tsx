import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { StepFour } from './StepFour';

export default {
  title: 'StepFour',
  component: StepFour,
};

const Template: Story<ComponentProps<typeof StepFour>> = (args) => (
  <StepFour {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  onRegister: (data) => alert(data.password),
};
