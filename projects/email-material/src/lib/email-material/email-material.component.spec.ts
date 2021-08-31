import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMaterialComponent } from './email-material.component';

describe('EmailMaterialComponent', () => {
  let component: EmailMaterialComponent;
  let fixture: ComponentFixture<EmailMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
