import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRedirectComponent } from './contact-redirect.component';

describe('ContactRedirectComponent', () => {
  let component: ContactRedirectComponent;
  let fixture: ComponentFixture<ContactRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
