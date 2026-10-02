import { renderComponent } from '../../testing/render-component.util';
import { PageHeader } from './page-header.component';

describe('PageHeader', () => {
  it('renders eyebrow, title and description', async () => {
    const fixture = await renderComponent(PageHeader, {
      setup: (f) => {
        f.componentRef.setInput('eyebrow', 'Front-end Foundation');
        f.componentRef.setInput('title', 'Design System');
        f.componentRef.setInput('description', 'หน้าอ้างอิง UI ของโปรเจค');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Design System');
    expect(el.textContent).toContain('Front-end Foundation');
    expect(el.textContent).toContain('หน้าอ้างอิง UI ของโปรเจค');
  });
});
