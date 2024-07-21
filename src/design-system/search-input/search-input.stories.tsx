import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { SearchInputComponent } from './search-input.component';
import { ICONS } from '../icon/icon.interface';

const meta: Meta<SearchInputComponent> = {
  title: 'Design System/Search input',
  component: SearchInputComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    prefix: {
      control: 'inline-radio',
      options: ICONS
    },
  },
  args: {
    id: 'input',
  },
  parameters: {
    controls: { exclude: ['value', 'valueUpdated', 'valueUpdatedEvent']}
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
