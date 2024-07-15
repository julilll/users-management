import type { Meta, StoryObj } from '@storybook/angular';
import { Icon, IconComponent } from './icon.component';
import { ICONS } from './icon.interface';

type Story = StoryObj<Icon>;

export default {
  title: 'Design System/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'inline-radio',
      options: ICONS
    }
  },
  parameters: {
    controls: { exclude: ['paths']}
  }
} satisfies Meta<Icon>;


export const Variant: Story = {
  args: {
    name: 'first_page',
    size: 32,
    color: '#ff8300'
  }
} satisfies Story;

