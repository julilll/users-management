import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { User } from 'shared/db-models.interface';
import { IconComponent } from 'design-system/icon/icon.component';

export interface TileCard {
  item: User;
}

@Component({
  selector: 'app-tile-card',
  templateUrl: 'tile-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  standalone: true,
  host: {
    '[style.display]': '"inline-block"'
  }})
export class TileCardComponent {
  public item = input.required<TileCard['item']>();
}
