import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { type IconName, icons } from './icon.interface';

export interface Icon {
  color?: string;
  size: number;
  name: IconName;
}

@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 -960 960 960">
      @for (path of paths(); track $index) {
        <path [attr.d]="path.d"></path>
      }
    </svg>
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[style.fill]': 'color()',
    '[style.width]': 'size() + "px"',
    '[style.height]': 'size() + "px"',
  }
})
export class IconComponent {
  public color = input<Icon['color']>();
  public size = input.required<Icon['size']>();
  public name = input.required<Icon['name']>();

  protected paths = computed(() => icons.find(({name}) => name === this.name())?.paths);
}
