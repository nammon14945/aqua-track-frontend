import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { toast } from '@spartan-ng/brain/sonner';
import { CURRENT_USER } from '../../core/session';
import { ThaiDatePipe } from '../../shared/pipes/thai-date.pipe';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

interface NavItem {
  readonly label: string;
  readonly icon: string;
  readonly route: string;
  readonly badge?: string;
}

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIcon,
    HlmAlertDialogImports,
    HlmAvatarImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmInputGroupImports,
    HlmSidebarImports,
    HlmTooltipImports,
    ThaiDatePipe,
    ThemeToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmSidebarWrapper sidebarWidth="16rem" sidebarWidthIcon="3.5rem">
      <hlm-sidebar collapsible="icon" variant="sidebar">
        <div hlmSidebarHeader>
          <a
            routerLink="/admin/dashboard"
            class="hover:bg-sidebar-accent flex items-center gap-2.5 rounded-lg p-2 transition-colors"
          >
            <span
              class="bg-brand-600 text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-xl shadow-soft-md shadow-brand-600/20 [&_ng-icon]:text-[length:--spacing(5)]"
            >
              <ng-icon name="lucideDroplet" />
            </span>
            <span class="flex flex-col group-data-[collapsible=icon]:hidden">
              <span class="text-body font-bold leading-tight">AquaTrack Pro</span>
              <span class="text-caption text-muted-foreground">จัดการโรงงานและจัดส่งน้ำดื่ม</span>
            </span>
          </a>

          <button
            hlmBtn
            class="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center"
            hlmTooltip
            [hlmTooltip]="'สร้างออเดอร์ใหม่'"
            (click)="notifyComingSoon('สร้างออเดอร์ใหม่')"
          >
            <ng-icon name="lucidePlus" />
            <span class="group-data-[collapsible=icon]:hidden">สร้างออเดอร์ใหม่</span>
          </button>
        </div>

        <div hlmSidebarContent>
          @for (group of navGroups; track group.label) {
            <div hlmSidebarGroup>
              <div hlmSidebarGroupLabel>{{ group.label }}</div>
              <div hlmSidebarGroupContent>
                <ul hlmSidebarMenu>
                  @for (item of group.items; track item.route) {
                    <li hlmSidebarMenuItem>
                      <a
                        hlmSidebarMenuButton
                        [routerLink]="item.route"
                        routerLinkActive="!bg-sidebar-accent !text-sidebar-accent-foreground !font-medium"
                        #rla="routerLinkActive"
                        [isActive]="rla.isActive"
                        [tooltip]="item.label"
                      >
                        <ng-icon [name]="item.icon" />
                        <span>{{ item.label }}</span>
                      </a>
                      @if (item.badge) {
                        <span hlmSidebarMenuBadge>{{ item.badge }}</span>
                      }
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>

        <div hlmSidebarFooter>
          <button
            hlmSidebarMenuButton
            class="text-muted-foreground"
            tooltip="ตั้งค่าระบบ"
            (click)="notifyComingSoon('ตั้งค่าระบบ')"
          >
            <ng-icon name="lucideSettings" />
            <span>ตั้งค่าระบบ</span>
          </button>

          <button
            hlmSidebarMenuButton
            class="text-danger hover:bg-danger-soft hover:text-danger-soft-foreground"
            tooltip="ออกจากระบบ"
            (click)="signOutDialog.open()"
          >
            <ng-icon name="lucideLogOut" />
            <span>ออกจากระบบ</span>
          </button>

          <p class="text-caption text-muted-foreground px-2 group-data-[collapsible=icon]:hidden">
            AquaTrack Cloud v2.4
          </p>
        </div>
      </hlm-sidebar>

      <main hlmSidebarInset class="bg-muted/40">
        <header
          class="bg-background/80 sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 backdrop-blur md:px-6"
        >
          <button
            hlmSidebarTrigger
            srOnlyText="เปิด/ปิดเมนู"
            class="[&_ng-icon]:text-[length:--spacing(4)]"
          ></button>

          <div hlmInputGroup class="hidden max-w-md flex-1 lg:flex">
            <div hlmInputGroupAddon>
              <ng-icon name="lucideSearch" class="text-muted-foreground" />
            </div>
            <input
              hlmInputGroupInput
              placeholder="ค้นหารหัสออเดอร์, ชื่อลูกค้า, หรือทะเบียนรถส่งน้ำ..."
            />
          </div>

          <div class="ms-auto flex items-center gap-1.5">
            <span class="text-body-sm text-muted-foreground hidden px-2 xl:inline">
              {{ today | thaiDate }}
            </span>

            <button hlmBtn variant="outline" size="sm" class="hidden sm:inline-flex">
              <ng-icon name="lucideDownload" data-icon="inline-start" />
              ส่งออกรายงาน
            </button>

            <div class="bg-border mx-1 hidden h-6 w-px sm:block"></div>

            <button
              type="button"
              hlmBtn
              variant="ghost"
              size="icon-sm"
              class="relative"
              hlmTooltip
              [hlmTooltip]="'แจ้งเตือนออเดอร์ใหม่ 5 รายการ'"
              aria-label="การแจ้งเตือน"
              (click)="notifyComingSoon('ศูนย์แจ้งเตือน')"
            >
              <ng-icon name="lucideBell" />
              <span
                class="bg-danger text-danger-foreground absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-background"
              >
                5
              </span>
            </button>

            <button
              type="button"
              hlmBtn
              variant="ghost"
              size="icon-sm"
              hlmTooltip
              [hlmTooltip]="'ศูนย์ช่วยเหลือ'"
              aria-label="ศูนย์ช่วยเหลือ"
              (click)="notifyComingSoon('ศูนย์ช่วยเหลือ')"
            >
              <ng-icon name="lucideCircleHelp" />
            </button>

            <!-- โปรไฟล์ผู้ใช้ (ตำแหน่งตามสเปก Stitch: ท้ายสุดของกลุ่มเครื่องมือ) -->
            <div data-slot="current-user" class="ms-1 flex items-center gap-2.5 border-s ps-3">
              <hlm-avatar
                class="size-9 ring-2 ring-brand-100 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                tabindex="0"
                role="img"
                [attr.aria-label]="user.name + ' · ' + user.role"
                hlmTooltip
                [hlmTooltip]="user.name + ' · ' + user.role"
              >
                <span hlmAvatarFallback class="bg-brand-100 text-brand-700">{{
                  user.initials
                }}</span>
              </hlm-avatar>
              <div class="hidden flex-col text-start lg:flex">
                <span class="text-caption font-semibold leading-tight">{{ user.name }}</span>
                <span class="text-[11px] text-muted-foreground">{{ user.role }}</span>
              </div>
            </div>

            <app-theme-toggle />
          </div>
        </header>

        <div class="flex-1 px-4 py-6 md:px-6">
          <router-outlet />
        </div>
      </main>
    </div>

    <hlm-alert-dialog #signOutDialog="hlmAlertDialog">
      <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
        <hlm-alert-dialog-header>
          <h3 hlmAlertDialogTitle>ออกจากระบบ?</h3>
          <p hlmAlertDialogDescription>คุณจะต้องเข้าสู่ระบบใหม่ด้วยชื่อผู้ใช้และรหัสผ่านอีกครั้ง</p>
        </hlm-alert-dialog-header>
        <hlm-alert-dialog-footer>
          <button hlmAlertDialogCancel hlmBtn variant="outline">ยกเลิก</button>
          <button hlmAlertDialogAction hlmBtn variant="destructive" (click)="signOut()">
            ออกจากระบบ
          </button>
        </hlm-alert-dialog-footer>
      </hlm-alert-dialog-content>
    </hlm-alert-dialog>
  `,
})
export class AdminLayout {
  protected readonly user = CURRENT_USER;
  protected readonly today = new Date();

  protected readonly navGroups: readonly { label: string; items: readonly NavItem[] }[] = [
    {
      label: 'ภาพรวม',
      items: [{ label: 'แดชบอร์ด', icon: 'lucideLayoutDashboard', route: '/admin/dashboard' }],
    },
    {
      label: 'สำหรับทีมพัฒนา',
      items: [{ label: 'ดีไซน์ซิสเต็ม', icon: 'lucideSparkles', route: '/design-system' }],
    },
  ];

  protected notifyComingSoon(feature: string): void {
    toast.info(`${feature} อยู่ระหว่างพัฒนา`, {
      description: 'หน้านี้จะเปิดใช้งานในรอบถัดไป',
    });
  }

  protected signOut(): void {
    toast.success('ออกจากระบบแล้ว', { description: 'แล้วพบกันใหม่' });
  }
}
