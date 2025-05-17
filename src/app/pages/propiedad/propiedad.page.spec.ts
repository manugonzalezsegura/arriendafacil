import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropiedadPage } from './propiedad.page';

describe('PropiedadPage', () => {
  let component: PropiedadPage;
  let fixture: ComponentFixture<PropiedadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
