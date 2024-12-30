import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferenceSettingsComponent } from './user-preference-settings.component';

describe('UserPreferenceSettingsComponent', () => {
  let component: UserPreferenceSettingsComponent;
  let fixture: ComponentFixture<UserPreferenceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPreferenceSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPreferenceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
