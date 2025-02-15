import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterComponent } from './admin-register-component.component';

describe('AdminRegisterComponentComponent', () => {
  let component: AdminRegisterComponent;
  let fixture: ComponentFixture<AdminRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
