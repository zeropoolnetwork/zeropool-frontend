import { ComponentProps } from 'react'

import { WalletHeader } from './WalletHeader'

type WalletHeaderArgs = ComponentProps<typeof WalletHeader>

const decoratorCss = { align: 'senter', padding: '3rem' }

export default {
  title: 'WalletHeader',
  component: WalletHeader,
  decorators: [(panel: any) => <div style={decoratorCss}> {panel()} </div>],
}

export const StoryOne = (args: WalletHeaderArgs) => <WalletHeader {...args} />
StoryOne.args = {}

export const StoryTwo = (args: WalletHeaderArgs) => <WalletHeader {...args} />
StoryTwo.args = {}
