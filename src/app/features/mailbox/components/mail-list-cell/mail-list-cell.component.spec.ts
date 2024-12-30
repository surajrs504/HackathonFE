import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailListCellComponent } from './mail-list-cell.component';

describe('MailListCellComponent', () => {
  let component: MailListCellComponent;
  let fixture: ComponentFixture<MailListCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailListCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailListCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
