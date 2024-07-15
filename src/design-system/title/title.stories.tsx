import type { Meta, StoryObj } from '@storybook/angular';
import { AppTitleComponent } from './title.component';

const meta: Meta<AppTitleComponent> = {
  title: 'Design System/Title',
  component: AppTitleComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large']
    },
    content: {
      control: 'text'
    }
  },
  parameters: {
    controls: { exclude: ['textSize', 'textSizes', 'getClasses']}
  }
};

export default meta;
type Story = StoryObj<AppTitleComponent>;

export const Small: Story = {
  args: {
    size: 'small',
    content: 'Small title test'
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    content: 'Large title test'
  },
};
