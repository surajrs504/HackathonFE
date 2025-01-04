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
import { MSALInstanceFactory } from '../../../../app.config';
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
  filterdMailList: any;
  selectedMail: any;
  groupListControl = new FormControl();
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

  isInboxEmpty = false;

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
    let filterValue = '';
    if (typeof value !== 'string') {
      return [];
    } else {
      filterValue = value.toLowerCase();
    }
    if (!this.groupList) return [''];
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
        

        // this.groupListControl.setValue(this.groupList[0]);
      },
      error: (error) => {},
      complete: () => {
        this.isLoading = false;
      },
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
    // this.mailBoxService.getMailList().subscribe({
    //   next: (data: any) => {
    //     this.mail_data = data.value;
    //     this.filterdMailList = this.mail_data;
    //     this.selectedMail = this.mail_data[0];
    //   },
    //   error: (error) => {},
    //   complete: () => {
    //     this.isLoading = false;
    //   },
    // });

    this.mailBoxService.getMailByGroup('all').subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.mail_data = data;
          this.filterdMailList = this.mail_data;
          this.selectedMail = this.mail_data[0];
        } else {
          this.isInboxEmpty = true;
          return;
        }
      },
      error: (error) => {},
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleShowProfile() {
    const dialogRef = this.profileDetailsDialog.open(ProfilePopupComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  sendEmail() {}

  handleSearchSelectedMail(mailData: any) {
    console.log('maildata', mailData);
    if (mailData) {
      this.selectedMail = mailData;
    }
  }

  handleFilterMailList(filterParam: string) {
    this.isInboxEmpty = false;
    if (filterParam === 'flagged') {
      this.filterdMailList = this.mail_data.filter(
        (mail: any) => mail.flag.flagStatus !== 'notFlagged'
      );
      if (this.filterdMailList.length === 0) {
        this.isInboxEmpty = true;
      }
      this.selectedMail = this.filterdMailList[0];
      return;
    }

    if (filterParam === 'unread') {
      this.filterdMailList = this.mail_data.filter(
        (mail: any) => mail.isRead === false
      );
      if (this.filterdMailList.length === 0) {
        this.isInboxEmpty = true;
      }
      this.selectedMail = this.filterdMailList[0];
      return;
    }

    if (filterParam === 'hasFiles') {
      this.filterdMailList = this.mail_data.filter(
        (mail: any) => mail.hasAttachments === true
      );
      if (this.filterdMailList.length === 0) {
        this.isInboxEmpty = true;
      }
      this.selectedMail = this.filterdMailList[0];
      return;
    }
    if (filterParam === 'clear') {
      this.filterdMailList = this.mail_data;
      this.selectedMail = this.filterdMailList[0];
      return;
    }
  }

  handleGroupSearch(){
    if(this.groupListControl.value===""){
      this.getMailByGroup("all")
    }
  }

  handleGroupSelection() {
   
    console.log('tss', this.groupListControl.value);
   this.getMailByGroup(this.groupListControl?.value?.id)
  }

  getMailByGroup(id:any){
    this.isLoading = true;
    this.isInboxEmpty = false;
    this.mailBoxService
    .getMailByGroup(id)
    .subscribe({
      next: (data: any) => {
        console.log(data, 'fddf');
        if (data.length === 0) {
          this.filterdMailList = undefined;
          this.selectedMail = undefined;

          this.isInboxEmpty = true;
        } else {
          this.filterdMailList = data;
          this.selectedMail = this.filterdMailList[0];
        }
      },
      error: (error) => {},
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  displayGroupWith(option: any) {
    return option ? option.group_name : '';
  }
}
