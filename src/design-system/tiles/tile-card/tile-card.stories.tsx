import type { Meta, StoryObj } from '@storybook/angular';
import { TileCardComponent } from './tile-card.component';
import { usersMock } from 'shared/users-mock';

const meta: Meta<TileCardComponent> = {
  title: 'Design System/Tiles/Tile card',
  component: TileCardComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TileCardComponent>;

export const Variant: Story = {
  args: {
    item: usersMock[0],
  },
};

