import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { StepHeader } from './StepHeader'

// This default export determines where your story goes in the story list
export default {
  title: 'StepHeader',
  component: StepHeader,
}

const Template: Story<ComponentProps<typeof StepHeader>> = (args) => <StepHeader {...args} />

export const FirstStory = Template.bind({})
FirstStory.args = {
  step: 2,
  total: 5,
}
