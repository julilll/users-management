import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TablePaginatorComponent } from '../table/paginator/table-pagination.component';
import { TileCardComponent } from './tile-card/tile-card.component';
import type { User } from 'shared/db-models.interface';
import { AppTitleComponent } from 'design-system/title/title.component';

export interface Table {
  items?: User[];
}

@Component({
  selector: 'app-tiles',
  templateUrl: 'tiles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TablePaginatorComponent, TileCardComponent, AppTitleComponent],
  standalone: true
})
export class TilesComponent {
  public items = input<Table['items']>();
  public updateItem = output<User>();
}
