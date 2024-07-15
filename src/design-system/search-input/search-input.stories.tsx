import type { Meta, StoryObj } from '@storybook/angular';
import { SearchInputComponent } from './search-input.component';
import { ICONS } from '../icon/icon.interface';

const meta: Meta<SearchInputComponent> = {
  title: 'Design System/Input field',
  component: SearchInputComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    prefix: {
      control: 'inline-radio',
      options: ICONS
    }
  },
  args: {
    id: 'input'
  }
};

export default meta;
type Story = StoryObj<SearchInputComponent>;

export const Variant: Story = {};

export const VariantWithIconAndPlaceholder: Story = {
  args: {
    prefix: 'search',
    placeholder: 'Type your test here...'
  },
};
