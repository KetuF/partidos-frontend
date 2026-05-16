import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPosiciones } from './tabla-posiciones';

describe('TablaPosiciones', () => {
  let component: TablaPosiciones;
  let fixture: ComponentFixture<TablaPosiciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPosiciones],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPosiciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
