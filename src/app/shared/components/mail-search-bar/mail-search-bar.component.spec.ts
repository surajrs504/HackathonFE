import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSearchBarComponent } from './mail-search-bar.component';

describe('MailSearchBarComponent', () => {
  let component: MailSearchBarComponent;
  let fixture: ComponentFixture<MailSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
