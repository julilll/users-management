import { ChangeDetectionStrategy, Component, ViewChild, computed, input } from '@angular/core';
import { IconComponent } from 'design-system/icon/icon.component';
import { NgClass, UpperCasePipe } from '@angular/common';
import { IconName } from 'design-system/icon/icon.interface';

export interface Button {
  type?: string;
  color?: string;
  content?: string;
  icon?: IconName;
  disabled?: boolean;
}

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="buttonClasses()" [type]="type()" [style.backgroundColor]="disabled()? 'grey' : _color()" [style.borderColor]="disabled()? 'grey' : _color()" [disabled]="disabled()">
      @if (icon()) {
          <app-icon [size]="16" [ngClass]="iconClasses()" [name]="icon()!"/>
        }
      @if (content()) {
        <p [ngClass]="_color() || disabled()? 'text-white': 'text-app-font-color'">{{ content() | uppercase }}</p>
      }
    </button>
  `,
  imports: [IconComponent, NgClass, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ButtonComponent {
  public color = input<Button['color']>();
  public type = input<Button['type']>();
  public disabled = input<Button['disabled']>();
  public content = input<Button['content']>();
  public icon = input<Button['icon']>();
  protected _color = computed(() => this.color());

  protected buttonClasses(): string {
    return `py-2 px-6 border-2 flex items-center gap-2 rounded`
  }

  protected iconClasses(): string {
    return this.color() ? "fill-white": "fill-app-font-color"
  }
}
