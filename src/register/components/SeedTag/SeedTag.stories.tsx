import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SeedTag } from './SeedTag';

// This default export determines where your story goes in the story list
export default {
  title: 'SeedTag',
  component: SeedTag,
};

const Template: Story<ComponentProps<typeof SeedTag>> = (args) => (
  <SeedTag {...args} />
);

export const JustText = Template.bind({});
JustText.args = {
  text: 'justtext',
};

export const TextAndNumber = Template.bind({});
TextAndNumber.args = {
  text: 'textandnumber',
  number: 12,
  onClick: (num) => alert(num),
};

export const PlaceholderMode = Template.bind({});
PlaceholderMode.args = {
  text: 'placeholdermode',
  number: 12345,
  hidden: true,
  onClick: (num) => alert(num),
};