import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableHeaderComponent } from './header/table-header.component';
import { TableRowComponent } from './row/table-row.component';
import { TablePaginatorComponent } from './paginator/table-pagination.component';
import type { User } from 'shared/db-models.interface';
import { AppTitleComponent } from 'design-system/title/title.component';

export interface Table {
  items?: User[];
}

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableHeaderComponent, TableRowComponent, TablePaginatorComponent, AppTitleComponent],
  standalone: true
})
export class TableComponent {
  public items = input<Table['items']>();
  public updateItem = output<User>();
}
