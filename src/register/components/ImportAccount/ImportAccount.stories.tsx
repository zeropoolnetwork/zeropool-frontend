import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { ImportAccount } from './ImportAccount'

export default {
  title: 'ImportAccount',
  component: ImportAccount,
}

const Template: Story<ComponentProps<typeof ImportAccount>> = (args) => <ImportAccount {...args} />

export const Empty = Template.bind({})
Empty.args = {
  onImport: (data) => alert(`Seed: ${data.seed}, password: ${data.password}`),
  onBack: () => alert('Back clicked'),
}
