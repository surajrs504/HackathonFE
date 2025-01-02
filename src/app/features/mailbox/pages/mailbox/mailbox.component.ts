import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MailListCellComponent } from '../../components/mail-list-cell/mail-list-cell.component';
import { MatButtonModule } from '@angular/material/button';
import { MailBodyComponent } from '../../components/mail-body/mail-body.component';
import mail_data from '../../../../core/data/mail_data.json';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserPreferenceSettingsComponent } from '../../components/user-preference-settings/user-preference-settings.component';
import { MailboxService } from '../../services/mailbox.service';
import { ProfilePopupComponent } from '../../../../shared/components/profile-popup/profile-popup.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { CommonService } from '../../../../core/services/common/common.service';
import { MailSearchBarComponent } from '../../../../shared/components/mail-search-bar/mail-search-bar.component';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionRequiredAuthError,
} from '@azure/msal-browser';
import { MSALInstanceFactory } from '../../../auth/components/login/login.component';
export interface frequentGroupList {
  name: string;
}

@Component({
  selector: 'app-mailbox',
  standalone: true,
  imports: [
    MatIconModule,
    MailListCellComponent,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MailBodyComponent,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MailSearchBarComponent,
  ],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.scss',
  providers: [
    MsalService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        loginFailedRoute: '/login',
      },
    },
  ],
})
export class MailboxComponent implements OnInit {
  mail_data: any;
  selectedMail: any;
  groupListControl = new FormControl('');
  subGroupListControl = new FormControl('');
  searchMailControl = new FormControl('');
  groupList: any[] = [];
  subGroupList: string[] = [];

  filteredGroupOptions: Observable<any[]> | undefined;
  filteredSubGroupOptions: Observable<string[]> | undefined;
  filteredMailSearchOptions: Observable<any[]> | undefined;
  isSelectAllEnabled = false;
  isAllMailSelected = false;
  isLoading = false;

  frequentGroupList: frequentGroupList[] = [];

  readonly userGroupDialog = inject(MatDialog);
  readonly profileDetailsDialog = inject(MatDialog);
  private notificationService = inject(NotificationService);
  private commonService = inject(CommonService);
  private msalService = inject(MsalService);

  mailBoxService = inject(MailboxService);

  ngOnInit(): void {
    this.getFrequentGroupList();
    this.getGroupList();
    this.getSubGroupList();
    this.getMailList();
   
    this.filteredSubGroupOptions = this.subGroupListControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSubGroups(value || ''))
    );
  }

  mailClicked(mail: any) {
    this.selectedMail = mail;
  }

  private _filterGroups(value: string) {
    const filterValue = value.toLowerCase();
    if(!this.groupList)return [""]
    return this.groupList.filter((option) =>
      option.group_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterSubGroups(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subGroupList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  remove(fruit: frequentGroupList): void {
    this.frequentGroupList = this.frequentGroupList.filter((k) => k !== fruit);
  }

  handleSelectAll() {
    this.isSelectAllEnabled = !this.isSelectAllEnabled;
  }
  handleSelectAllCheckbox() {
    this.isAllMailSelected = !this.isAllMailSelected;
  }

  handleUserGroupSetting() {
    const dialogRef = this.userGroupDialog.open(
      UserPreferenceSettingsComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  handleDeleteSelectedMail() {}

  getFrequentGroupList() {
    this.mailBoxService.getFrequentGroupList().subscribe({
      next: (data) => {
        this.frequentGroupList = data;
      },
      error: (error) => {},
    });
  }
  getGroupList() {
    this.isLoading = true;
    this.mailBoxService.getGroupList().subscribe({
      next: (data: any) => {
        this.groupList = data.groups;
        this.filteredGroupOptions = this.groupListControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterGroups(value || ''))
        );
      },
      error: (error) => {},
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  getSubGroupList() {
    this.mailBoxService.getSubGroupList().subscribe({
      next: (data) => {
        this.subGroupList = data;
      },
      error: (error) => {},
    });
  }

  //mail list section
  getMailList() {
    this.isLoading = true;
    this.mailBoxService.getMailList().subscribe({
      next: (data: any) => {
        this.mail_data = data.value;
        this.selectedMail = this.mail_data[0];
      },
      error: (error) => {},
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleShowProfile() {
    const dialogRef = this.profileDetailsDialog.open(ProfilePopupComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  sendEmail() {}
}
