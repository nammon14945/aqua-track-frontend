import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsSection } from './ds-section.component';

describe('DsSection', () => {
  it('renders the anchor id, eyebrow and title', async () => {
    const fixture = await renderComponent(DsSection, {
      setup: (f) => {
        f.componentRef.setInput('id', 'colors');
        f.componentRef.setInput('title', 'Colors');
        f.componentRef.setInput('eyebrow', 'Foundations');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('section')?.id).toBe('colors');
    expect(el.querySelector('h2')?.textContent).toContain('Colors');
    expect(el.textContent).toContain('Foundations');
  });
});
