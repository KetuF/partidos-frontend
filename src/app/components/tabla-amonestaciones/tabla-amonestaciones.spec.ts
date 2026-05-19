import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAmonestaciones } from './tabla-amonestaciones';

describe('TablaAmonestaciones', () => {
  let component: TablaAmonestaciones;
  let fixture: ComponentFixture<TablaAmonestaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAmonestaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaAmonestaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
