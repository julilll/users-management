import type { Meta, StoryObj } from '@storybook/angular';
import { Button, ButtonComponent } from 'design-system/button/button.component';
import { ICONS } from 'design-system/icon/icon.interface';

type Story = StoryObj<Button>;

export default {
  title: 'Design System/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['green', 'red']
    },
    content: {
      control: 'text',
    },
    icon: {
      control: 'inline-radio',
      options: ICONS
    },
    disabled: {
      control: 'boolean'
    }
  },
  parameters: {
    controls: { exclude: ['paths']}
  }
} satisfies Meta<ButtonComponent>;


export const Variant: Story = {
  args: {
    content: 'Button'
  }
} satisfies Story;

export const VariantWithIcon: Story = {
  args: {
    color: 'green',
    content: 'Save',
    icon: 'save'
  }
} satisfies Story;
