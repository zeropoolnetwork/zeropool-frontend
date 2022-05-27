import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TemplateName } from './TemplateName';

const decoratorCss = { align: 'senter', padding: '3rem' };

export default {
  title: 'TemplateName',
  component: TemplateName,
  decorators: [(panel: any) => <div style={decoratorCss}>{panel()}</div>],
};

const Template: ComponentStory<typeof TemplateName> = (args) => (
  <TemplateName {...args} />
);

export const StoryOme = Template.bind({});
StoryOme.args = {
};

export const StoryTwo = Template.bind({});
StoryTwo.args = {
};