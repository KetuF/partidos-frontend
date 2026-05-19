import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSanciones } from './tabla-sanciones';

describe('TablaSanciones', () => {
  let component: TablaSanciones;
  let fixture: ComponentFixture<TablaSanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaSanciones],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaSanciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
