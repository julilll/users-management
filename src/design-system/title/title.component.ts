import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface AppTitle {
  size: 'small' | 'large';
  content: string;
}

@Component({
  selector: 'app-title',
  template: `
    <p [class]="getClasses()">{{content()}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[style.display]': '"block"'
  }
})
export class AppTitleComponent {
  public size = input.required<AppTitle['size']>();
  public content = input.required<AppTitle['content']>();

  private textSize = computed(() => this.textSizes[this.size()]);

  protected getClasses(): string {
    return `${this.textSize()} text-app-bluish`
  }

  private textSizes: Record<AppTitle['size'], string> = {
    small: 'font-medium',
    large: 'text-2xl font-bold'
  };
}
