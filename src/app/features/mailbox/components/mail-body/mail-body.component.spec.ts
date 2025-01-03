import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailBodyComponent } from './mail-body.component';

describe('MailBodyComponent', () => {
  let component: MailBodyComponent;
  let fixture: ComponentFixture<MailBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
