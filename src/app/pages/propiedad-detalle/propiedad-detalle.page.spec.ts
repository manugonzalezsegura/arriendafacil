import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropiedadDetallePage } from './propiedad-detalle.page';

describe('PropiedadDetallePage', () => {
  let component: PropiedadDetallePage;
  let fixture: ComponentFixture<PropiedadDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
