import type { Meta, StoryObj } from '@storybook/angular';
import { TablePaginatorComponent } from './table-pagination.component';

const meta: Meta<TablePaginatorComponent> = {
  title: 'Design System/Table/Paginator',
  component: TablePaginatorComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { exclude: ['_currentPage', '_itemsPerPage', 'store', 'totalPages', 'itemsPerPageUpdated', 'nextPage', 'previousPage', 'toTheEnd', 'toTheStart']}
  }
};

export default meta;
type Story = StoryObj<TablePaginatorComponent>;

export const Variant: Story = {};

