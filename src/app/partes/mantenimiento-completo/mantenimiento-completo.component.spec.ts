import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCompletoComponent } from './mantenimiento-completo.component';

describe('MantenimientoCompletoComponent', () => {
  let component: MantenimientoCompletoComponent;
  let fixture: ComponentFixture<MantenimientoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
