import { ChangeDetectionStrategy, Component, model, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconName } from 'design-system/icon/icon.interface';
import { IconComponent } from 'design-system/icon/icon.component';
import { NgClass } from '@angular/common';

export interface SearchInput {
  value: string;
  prefix?: IconName;
  label?: string;
  id: string;
  placeholder?: string;
}

@Component({
  selector: 'app-search-input',
  template: `
    <div class="block relative">
      <label ></label>
      @if (prefix()!) { <app-icon class="absolute inset-y-4 left-0 ml-4" [name]="prefix()!" [size]="32" color="#CBCBCB" /> }
      <input
        data-testid="search-input"
        [ngClass]="{'w-full shadow-md p-5 placeholder:italic placeholder:text-black placeholder:text-base placeholder:font-extralight rounded-lg': true, 'pl-14': !!prefix()}"
        [id]="id()"
        [name]="id()"
        [placeholder]="placeholder()"
        [(ngModel)]="value"
        (keyup)="valueUpdatedEvent()"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent, NgClass],
  standalone: true,
  host: {
    '[style.display]': '"block"'
  }
})
export class SearchInputComponent {
  public value = model('');
  public prefix = input<SearchInput['prefix']>();
  public id = input.required<SearchInput['id']>();
  public placeholder = input<SearchInput['placeholder']>('');
  public valueUpdated = output<SearchInput['value']>();

  valueUpdatedEvent(): void {
    this.valueUpdated.emit(this.value())
  }
}
