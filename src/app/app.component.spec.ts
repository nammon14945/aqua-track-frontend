import { App } from './app.component';
import { renderComponent } from './shared/testing/render-component.util';

describe('AppComponent', () => {
  it('renders the router outlet and toaster', async () => {
    const fixture = await renderComponent(App);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('router-outlet')).toBeTruthy();
    expect(el.querySelector('hlm-toaster')).toBeTruthy();
  });
});
