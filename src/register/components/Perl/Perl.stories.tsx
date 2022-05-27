import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Perl } from './Perl'

// This default export determines where your story goes in the story list
export default {
  title: 'Perl',
  component: Perl,
} as ComponentMeta<typeof Perl>

const Template: ComponentStory<typeof Perl> = (args) => <Perl {...args} />

export const NumberOne = Template.bind({})
NumberOne.args = {
  num: 1,
}

export const NumberTwoActive = Template.bind({})
NumberTwoActive.args = {
  num: 2,
  isActive: true,
}
