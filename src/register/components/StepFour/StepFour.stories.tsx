import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StepFour } from './StepFour'

export default {
  title: 'StepFour',
  component: StepFour,
} as ComponentMeta<typeof StepFour>

const Template: ComponentStory<typeof StepFour> = (args) => <StepFour {...args} />

export const Empty = Template.bind({})
Empty.args = {
  onRegister: (data) => alert(data.password),
}
