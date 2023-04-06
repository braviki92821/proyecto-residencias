import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarusersComponent } from './consultarusers.component';

describe('ConsultarusersComponent', () => {
  let component: ConsultarusersComponent;
  let fixture: ComponentFixture<ConsultarusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
