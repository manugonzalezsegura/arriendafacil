import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisPropiedadesPage } from './mis-propiedades.page';

describe('MisPropiedadesPage', () => {
  let component: MisPropiedadesPage;
  let fixture: ComponentFixture<MisPropiedadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPropiedadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
