import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsPreview } from './ds-preview.component';

describe('DsPreview', () => {
  it('renders the title and description', async () => {
    const fixture = await renderComponent(DsPreview, {
      setup: (f) => {
        f.componentRef.setInput('title', 'Button — variants');
        f.componentRef.setInput('description', 'ปุ่มหลักของระบบ');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h3')?.textContent).toContain('Button — variants');
    expect(el.textContent).toContain('ปุ่มหลักของระบบ');
  });

  it('shows the code block with a copy button when code is provided', async () => {
    const fixture = await renderComponent(DsPreview, {
      setup: (f) => {
        f.componentRef.setInput('title', 'Dialog');
        f.componentRef.setInput('code', '<hlm-dialog />');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('pre')?.textContent).toContain('<hlm-dialog />');
    expect(el.querySelector('button')?.textContent).toContain('คัดลอก');
  });
});
