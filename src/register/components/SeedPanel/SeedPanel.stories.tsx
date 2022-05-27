import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SeedPanel } from './SeedPanel'

const decoratorCss = { align: 'senter', padding: '3rem' }

export default {
  title: 'SeedPanel',
  component: SeedPanel,
  decorators: [(panel: any) => <div style={decoratorCss}>{panel()}</div>],
} as ComponentMeta<typeof SeedPanel>

const Template: ComponentStory<typeof SeedPanel> = (args) => <SeedPanel {...args} />

export const PanelEmpty = Template.bind({})
PanelEmpty.args = {
  seed: [],
}

export const PanelInShowMode = Template.bind({})
PanelInShowMode.args = {
  seed: ['one', 'two', 'three'],
}
