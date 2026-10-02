import { provideHttpClient } from '@angular/common/http';
import { type Provider, type Type } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, type Routes } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';

import { APP_ICONS } from '../../core/icons';

export interface RenderOptions<T> {
  readonly providers?: readonly Provider[];
  /** ใช้เมื่อ spec ต้อง navigate ไป route จริง (เช่น ทดสอบ routerLinkActive) */
  readonly routes?: Routes;
  readonly setup?: (fixture: ComponentFixture<T>) => void;
}

/**
 * TestBed กลางสำหรับ component spec — เปิด provider พื้นฐานของโปรเจคให้ครบ
 * (router, http, icons, spartan helm) แล้ว render component พร้อม detectChanges
 */
export const renderComponent = async <T>(
  component: Type<T>,
  options: RenderOptions<T> = {},
): Promise<ComponentFixture<T>> => {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideRouter(options.routes ?? []),
      provideHttpClient(),
      provideIcons(APP_ICONS),
      provideSpartanHlm(),
      ...(options.providers ?? []),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  options.setup?.(fixture);
  fixture.detectChanges();
  return fixture;
};

/** รอ MutationObserver ของ spartan-ng จัดการคลาสก่อน assert */
export const flushMicrotasks = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve));
};
