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
      options: ['green', 'red'],
      description: 'Two options provided'
    },
    content: {
      control: 'text',
      description: 'Text written in the button'
    },
    icon: {
      control: 'inline-radio',
      options: ICONS,
      description: 'Icon provided'
    },
    disabled: {
      control: 'boolean',
      description: 'Design for disabled solution'
    }
  },
  parameters: {
    controls: { exclude: ['_color', 'type', 'buttonClasses', 'iconClasses']}
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

export const VariantOnlyIcon: Story = {
  args: {
    color: 'green',
    icon: 'save'
  }
} satisfies Story;

export const VariantWithIconAndDisabled: Story = {
  args: {
    color: 'green',
    content: 'Save',
    icon: 'save',
    disabled: true
  }
} satisfies Story;
