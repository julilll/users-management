import type { Meta, StoryObj } from '@storybook/angular';
import { TableRowComponent } from './table-row.component';
import { usersMock } from 'shared/users-mock';

const meta: Meta<TableRowComponent> = {
  title: 'Design System/Table/Row',
  component: TableRowComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TableRowComponent>;

export const Variant: Story = {
  args: {
    item: usersMock[0],
  },
};

