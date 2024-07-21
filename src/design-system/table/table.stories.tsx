import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';
import { usersMock } from 'shared/users-mock';

const meta: Meta<TableComponent> = {
  title: 'Design System/Table',
  component: TableComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Empty: Story = {};

export const Variant: Story = {
  args: { items: usersMock.slice(0, 5) },
};
