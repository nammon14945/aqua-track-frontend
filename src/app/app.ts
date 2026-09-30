import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToaster } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
    <hlm-toaster position="top-right" [richColors]="true" />
  `,
  styles: `
    :host {
      display: block;
      min-height: 100svh;
    }
  `,
})
export class App {}
