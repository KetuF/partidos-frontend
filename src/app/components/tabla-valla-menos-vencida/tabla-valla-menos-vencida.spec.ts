import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVallaMenosVencida } from './tabla-valla-menos-vencida';

describe('TablaVallaMenosVencida', () => {
  let component: TablaVallaMenosVencida;
  let fixture: ComponentFixture<TablaVallaMenosVencida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaVallaMenosVencida],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaVallaMenosVencida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
