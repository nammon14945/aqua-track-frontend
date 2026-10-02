import { renderComponent } from '../../shared/testing/render-component.util';
import { MainLayout } from './main-layout.component';

describe('MainLayout', () => {
  it('renders the sidebar, header and nested router outlet inside the sidebar inset', async () => {
    const fixture = await renderComponent(MainLayout, {
      routes: [{ path: '', children: [] }],
    });
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('[hlmSidebarWrapper]')).toBeTruthy();
    expect(el.querySelector('app-sidebar')).toBeTruthy();
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('main[hlmSidebarInset] router-outlet')).toBeTruthy();
  });
});
