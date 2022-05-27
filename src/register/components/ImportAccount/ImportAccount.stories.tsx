import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ImportAccount } from './ImportAccount'

export default {
  title: 'ImportAccount',
  component: ImportAccount,
} as ComponentMeta<typeof ImportAccount>

const Template: ComponentStory<typeof ImportAccount> = (args) => (
  <ImportAccount {...args} />
)

export const Empty = Template.bind({})
Empty.args = {
  onImport: (data) => alert(`Seed: ${data.seed}, password: ${data.password}`),
  onBack: () => alert('Back clicked'),
}
