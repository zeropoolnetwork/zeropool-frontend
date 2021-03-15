import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { WalletHeader } from './WalletHeader'

const decoratorCss = { align: 'senter', padding: '3rem' }

export default {
  title: 'WalletHeader',
  component: WalletHeader,
  decorators: [(panel: any) => <div style={decoratorCss}> {panel()} </div>],
}

const Template: Story<ComponentProps<typeof WalletHeader>> = (args) => <WalletHeader {...args} />

export const StoryOme = Template.bind({})
StoryOme.args = {}

export const StoryTwo = Template.bind({})
StoryTwo.args = {}
