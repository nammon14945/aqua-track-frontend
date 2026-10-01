import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { DsPreview } from '../components/ds-preview';
import { DsSection } from '../components/ds-section';

@Component({
  selector: 'app-ds-navigation',
  imports: [
    DsSection,
    DsPreview,
    RouterLink,
    NgIcon,
    HlmAccordionImports,
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmCollapsibleImports,
    HlmDropdownMenuImports,
    HlmTabsImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-ds-section
      id="navigation"
      eyebrow="Components"
      title="Navigation"
      description="นำทางระหว่างหน้าและซ่อนเนื้อหาที่ไม่จำเป็น — ตัวอย่างคอมโพเนนต์นำทางที่พร้อมใช้ในทุกหน้าจอ"
    >
      <app-ds-preview
        title="Breadcrumb"
        description="บอกตำแหน่งปัจจุบัน — ใช้คู่กับหัวหน้าเพจทุกหน้า"
      >
        <nav hlmBreadcrumb>
          <ol hlmBreadcrumbList>
            <li hlmBreadcrumbItem>
              <a hlmBreadcrumbLink routerLink="/design-system">ภาพรวม</a>
            </li>
            <li hlmBreadcrumbSeparator></li>
            <li hlmBreadcrumbItem>
              <a hlmBreadcrumbLink routerLink="/design-system">จัดการข้อมูล</a>
            </li>
            <li hlmBreadcrumbSeparator></li>
            <li hlmBreadcrumbItem>
              <span hlmBreadcrumbPage>รายละเอียดออเดอร์</span>
            </li>
          </ol>
        </nav>
      </app-ds-preview>

      <app-ds-preview
        title="Tabs"
        description="สลับมุมมองข้อมูลในหน้าเดียว เช่น สถานะออเดอร์"
        code='&lt;div hlmTabs [tab]="&apos;all&apos;"&gt;
  &lt;div hlmTabsList&gt;
    &lt;button hlmTabsTrigger="all"&gt;ทั้งหมด&lt;/button&gt;
  &lt;/div&gt;
  &lt;div hlmTabsContent="all"&gt;...&lt;/div&gt;
&lt;/div&gt;'
      >
        <div hlmTabs [tab]="'all'" class="w-full">
          <div hlmTabsList class="w-fit">
            <button hlmTabsTrigger="all">ทั้งหมด</button>
            <button hlmTabsTrigger="pending">รอดำเนินการ</button>
            <button hlmTabsTrigger="transit">กำลังส่ง</button>
            <button hlmTabsTrigger="done">ส่งแล้ว</button>
          </div>
          <div hlmTabsContent="all" class="text-body text-muted-foreground">
            แสดงออเดอร์ทุกสถานะ (48 รายการ)
          </div>
          <div hlmTabsContent="pending" class="text-body text-muted-foreground">
            ออเดอร์ที่รอดำเนินการ 7 รายการ
          </div>
          <div hlmTabsContent="transit" class="text-body text-muted-foreground">
            อยู่ระหว่างการส่ง 12 รายการ
          </div>
          <div hlmTabsContent="done" class="text-body text-muted-foreground">
            ส่งสำเร็จแล้ว 29 รายการ
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Dropdown menu"
        description="เมนูบริบทของรายการ (แก้ไข / ทำซ้ำ / ลบ)"
        code='&lt;button hlmBtn [hlmDropdownMenuTrigger]="menu"&gt;...&lt;/button&gt;
&lt;ng-template #menu&gt;
  &lt;hlm-dropdown-menu&gt;
    &lt;button hlmDropdownMenuItem&gt;แก้ไข&lt;/button&gt;
  &lt;/hlm-dropdown-menu&gt;
&lt;/ng-template&gt;'
      >
        <button hlmBtn variant="outline" [hlmDropdownMenuTrigger]="menu">
          จัดการออเดอร์
          <ng-icon name="lucideChevronDown" data-icon="inline-end" />
        </button>

        <ng-template #menu>
          <hlm-dropdown-menu>
            <div hlmDropdownMenuLabel>ออเดอร์ ORD-6902</div>
            <hlm-dropdown-menu-separator />
            <button hlmDropdownMenuItem>
              <ng-icon name="lucidePencil" />
              แก้ไขรายการ
            </button>
            <button hlmDropdownMenuItem>
              <ng-icon name="lucideCopy" />
              ทำซ้ำ
            </button>
            <button hlmDropdownMenuItem>
              <ng-icon name="lucideRoute" />
              ย้ายสายรถ
            </button>
            <hlm-dropdown-menu-separator />
            <button hlmDropdownMenuItem variant="destructive">
              <ng-icon name="lucideTrash2" />
              ยกเลิกออเดอร์
            </button>
          </hlm-dropdown-menu>
        </ng-template>
      </app-ds-preview>

      <app-ds-preview
        title="Accordion"
        description="ซ่อนรายละเอียดเพิ่มเติม เช่น เงื่อนไขการส่งหรือประวัติการชำระ"
      >
        <div hlmAccordion type="single" class="w-full max-w-xl">
          <div hlmAccordionItem>
            <hlm-accordion-trigger>เงื่อนไขการคืนถังเปล่า</hlm-accordion-trigger>
            <hlm-accordion-content>
              <p class="text-body-sm text-muted-foreground">
                ลูกค้าต้องคืนถังเปล่าภายใน 7 วันนับจากวันส่ง ถ้าเกินกำหนดจะถูกคิดค่ามัดจำถังเพิ่ม
                ระบบจะแสดงยอด "ถังค้างส่ง" ให้พนักงานส่งน้ำเห็นทุกครั้งก่อนออกเดินทาง
              </p>
            </hlm-accordion-content>
          </div>
          <div hlmAccordionItem>
            <hlm-accordion-trigger>การตัดสต็อกอัตโนมัติ</hlm-accordion-trigger>
            <hlm-accordion-content>
              <p class="text-body-sm text-muted-foreground">
                เมื่อพนักงานกด "ส่งน้ำสำเร็จ"
                ระบบจะตัดสต็อกหน้าโรงงานและบันทึกจำนวนถังบนรถให้อัตโนมัติ
              </p>
            </hlm-accordion-content>
          </div>
          <div hlmAccordionItem>
            <hlm-accordion-trigger>การบันทึกยอดค้างชำระ (เครดิต)</hlm-accordion-trigger>
            <hlm-accordion-content>
              <p class="text-body-sm text-muted-foreground">
                เลือกช่องทางชำระเป็น "เครดิต" ระบบจะสร้างรายการลูกหนี้และแจ้งเตือนฝ่ายบัญชีทันที
              </p>
            </hlm-accordion-content>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Collapsible" description="เปิด/ปิดเนื้อหารอง เช่น ตัวกรองขั้นสูง">
        <div hlmCollapsible class="w-full max-w-xl">
          <button hlmCollapsibleTrigger hlmBtn variant="outline" class="w-full justify-between">
            ตัวกรองขั้นสูง
            <ng-icon name="lucideChevronDown" data-icon="inline-end" />
          </button>
          <div hlmCollapsibleContent class="pt-3">
            <div class="bg-muted/40 text-body-sm text-muted-foreground rounded-lg border p-3">
              ตัวกรอง: โซนส่งน้ำ · ช่วงวันที่ · สถานะการชำระ · จำนวนถังค้าง
            </div>
          </div>
        </div>
      </app-ds-preview>
    </app-ds-section>
  `,
})
export class DsNavigation {}
