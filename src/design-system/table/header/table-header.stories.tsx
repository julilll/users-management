import type { Meta, StoryObj } from '@storybook/angular';
import { TableHeaderComponent } from './table-header.component';

const meta: Meta<TableHeaderComponent> = {
  title: 'Design System/Table/Header',
  component: TableHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['_sortDirection', '_sortField', 'store', 'changeOrder', 'getPrefix']}
  }
};

export default meta;
type Story = StoryObj<TableHeaderComponent>;

export const Variant: Story = {};

