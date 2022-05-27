import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SeedTag } from './SeedTag'

// This default export determines where your story goes in the story list
export default {
  title: 'SeedTag',
  component: SeedTag,
} as ComponentMeta<typeof SeedTag>

const Template: ComponentStory<typeof SeedTag> = (args) => <SeedTag {...args} />

export const JustText = Template.bind({})
JustText.args = {
  text: 'justtext',
}

export const TextAndNumber = Template.bind({})
TextAndNumber.args = {
  text: 'textandnumber',
  num: 12,
  onClick: (num) => alert(num),
}

export const PlaceholderMode = Template.bind({})
PlaceholderMode.args = {
  text: 'placeholdermode',
  num: 12345,
  hidden: true,
  onClick: (num) => alert(num),
}
