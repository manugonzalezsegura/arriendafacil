import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilGeneralPage } from './perfil-general.page';

describe('PerfilGeneralPage', () => {
  let component: PerfilGeneralPage;
  let fixture: ComponentFixture<PerfilGeneralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
