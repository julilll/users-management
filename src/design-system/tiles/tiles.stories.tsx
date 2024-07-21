import type { Meta, StoryObj } from '@storybook/angular';
import { TilesComponent } from './tiles.component';
import { usersMock } from 'shared/users-mock';

const meta: Meta<TilesComponent> = {
  title: 'Design System/Tiles',
  component: TilesComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TilesComponent>;

export const Empty: Story = {};

export const Variant: Story = {
  args: { items: usersMock.slice(0, 5) },
};
