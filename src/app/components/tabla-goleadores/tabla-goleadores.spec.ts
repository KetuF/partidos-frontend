import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGoleadores } from './tabla-goleadores';

describe('TablaGoleadores', () => {
  let component: TablaGoleadores;
  let fixture: ComponentFixture<TablaGoleadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaGoleadores],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaGoleadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
