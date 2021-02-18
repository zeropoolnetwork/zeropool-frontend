import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Perl } from './Perl';

// This default export determines where your story goes in the story list
export default {
  title: 'Perl',
  component: Perl,
};

const Template: Story<ComponentProps<typeof Perl>> = (args) => (
  <Perl {...args} />
);

export const NumberOne = Template.bind({});
NumberOne.args = {
  number: 1
};

export const NumberTwoActive = Template.bind({});
NumberTwoActive.args = {
  number: 2,
  isActive: true
};
