import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConsultarComponent } from './menu-consultar.component';

describe('MenuConsultarComponent', () => {
  let component: MenuConsultarComponent;
  let fixture: ComponentFixture<MenuConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConsultarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
