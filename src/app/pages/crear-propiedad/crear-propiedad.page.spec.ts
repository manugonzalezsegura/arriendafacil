import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPropiedadPage } from './crear-propiedad.page';

describe('CrearPropiedadPage', () => {
  let component: CrearPropiedadPage;
  let fixture: ComponentFixture<CrearPropiedadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPropiedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
