import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import type { User } from 'shared/db-models.interface';
import { IconComponent } from 'design-system/icon/icon.component';

export interface TableRow {
  item: User;
}

@Component({
  selector: 'app-table-row',
  templateUrl: 'table-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, IconComponent],
  standalone: true
})
export class TableRowComponent {
  public item = input.required<TableRow['item']>();
}
