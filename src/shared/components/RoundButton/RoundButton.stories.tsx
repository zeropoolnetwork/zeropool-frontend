import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { RoundButton } from './RoundButton';

// This default export determines where your story goes in the story list
export default {
  title: 'RoundButton',
  component: RoundButton,
};

const Template: Story<ComponentProps<typeof RoundButton>> = (args) => (
  <RoundButton {...args} />
);

export const IconContent = Template.bind({});
IconContent.args = {
  // onClick: () => alert('IconContent'),
};

export const TextContent = Template.bind({});
TextContent.args = {
  // onClick: () => alert('TextContent'),
};

export const TextAndIconContent = Template.bind({});
TextAndIconContent.args = {
  // onClick: () => alert('TextAndIconContent'),
};
