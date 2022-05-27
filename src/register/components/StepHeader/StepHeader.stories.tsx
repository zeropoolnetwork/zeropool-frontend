import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StepHeader } from './StepHeader'

// This default export determines where your story goes in the story list
export default {
  title: 'StepHeader',
  component: StepHeader,
} as ComponentMeta<typeof StepHeader>

const Template: ComponentStory<typeof StepHeader> = (args) => <StepHeader {...args} />

export const FirstStory = Template.bind({})
FirstStory.args = {
  step: 2,
  total: 5,
}
