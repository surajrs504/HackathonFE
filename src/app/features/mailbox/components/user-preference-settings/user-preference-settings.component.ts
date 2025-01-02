import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MailboxService } from '../../services/mailbox.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
@Component({
  selector: 'app-user-preference-settings',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    CommonModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './user-preference-settings.component.html',
  styleUrl: './user-preference-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreferenceSettingsComponent implements OnInit {
  myControl = new FormControl('');
  groupList: any[] = [];
  subGroupList: any[] = [];
  // subGroupList: string[] = ['Priority', 'Urgency', 'Client', 'Team', 'Project'];
  filteredGroupOptions: Observable<any[]> | undefined;
  filteredSubGroupOptions: Observable<any[]> | undefined;
  groupListControl = new FormControl('');
  groupDescription = '';
  groupName = '';
  subGroupName = '';

  isGroupEdit = false;
  isSubGroupEdit = false;
  isAddNewGroup = false;
  isAddNewSubGroup = false;

  subGroupListControl = new FormControl('');
  subGroupDescription = '';
  selectedGroup: any;
  seletedSubGroup: any;
  selectedTab = 0;

  constructor(
    public userPreferenceRef: MatDialogRef<UserPreferenceSettingsComponent>
  ) {}
  private mailBoxService = inject(MailboxService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.getGroupList();
  }

  getGroupList() {
    this.mailBoxService.getGroupList().subscribe({
      next: (response: any) => {
        this.groupList = response.groups;
        this.groupListControl.setValue('');
        this.filteredGroupOptions = this.groupListControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            console.log(this._filterGroups(value || ''));
            if (this._filterGroups(value || '').length === 0) {
              this.groupDescription = '';
            }
            return this._filterGroups(value || '');
          })
        );
      },
      error: (error) => {},
    });
  }

  private _filterGroups(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groupList.filter((option) =>
      option.group_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterSubGroups(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subGroupList.filter((option) =>
      option.field.toLowerCase().includes(filterValue)
    );
  }
  handleRemoveGroup(keyword: string) {
    this.groupList = this.groupList.filter((k) => k !== keyword);
  }

  // handleRemoveSubGroup(keyword: string) {
  //   this.subGroupList = this.subGroupList.filter((k) => k !== keyword);
  // }

  closeDialog() {
    this.userPreferenceRef.close();
  }

  handleAddNewGroup() {
    this.isGroupEdit = false;
    this.isAddNewGroup = true;
    this.groupName = '';
    this.groupDescription = '';
  }

  saveGroupChanges() {}

  saveSubGroupChanges() {}

  handleGroupEdit() {
    this.isGroupEdit = true;
    this.isAddNewGroup = false;
  }

  handleDeleteGroup(){
    const selectedGroup = this.groupListControl?.value;
    const selectedGroupData = this.groupList.find(
      (group) => group.group_name === selectedGroup
    );
    this.mailBoxService.deleteGroup(selectedGroupData?.id).subscribe({
      next: (response) => {
        this.getGroupList();
        this.notificationService.showSuccess('Group deleted succesfully', 5);
      },
      error: (error) => {
        this.notificationService.showError('Somthing went wrong', 5);
      },
    })
  }

  handleGroupSelection(selection: any) {
    if (this.selectedTab === 0) {
      this.groupDescription = '';
      const selectedGroup = this.groupList.find(
        (group) => this.groupListControl.value === group.group_name
      );
      this.groupDescription = selectedGroup?.description;
      this.groupName = this.groupListControl?.value!;
      return;
    }
    if (this.selectedTab === 1) {
      this.getSubGroupList();
    }
  }

  handleGroupSave() {
    if (this.isGroupEdit) {
      const selectedGroup = this.groupListControl?.value;
      const newGroupName = this.groupName;
      const newGroupDescripion = this.groupDescription;
      const selectedGroupData = this.groupList.find(
        (group) => group.group_name === selectedGroup
      );

      console.log('EDIT', selectedGroup, newGroupName, newGroupDescripion);
      this.isAddNewGroup = false;
      this.isGroupEdit = false;
      this.groupName = '';
      this.groupDescription = '';
      const data = {
        id: selectedGroupData.id,
        group_name: newGroupName,
        description: newGroupDescripion,
      };

      this.mailBoxService.editGroup(data).subscribe({
        next: (response) => {
          this.getGroupList();
          this.notificationService.showSuccess('Group edited succesfully', 5);
        },
        error: (error) => {
          this.notificationService.showError('Somthing went wrong', 5);
        },
      });
    }
    if (this.isAddNewGroup) {
      const newGroupName = this.groupName;
      const newGroupDescripion = this.groupDescription;
      console.log('ADD', newGroupName, newGroupDescripion);
      // this.mailBoxService.addNewGroup().subscribe({
      //   next: (response) => {
      //     this.notificationService.showSuccess('Group edited succesfully', 5);
      //   },
      //   error: (error) => {
      //     this.notificationService.showError('Somthing went wrong', 5);
      //   },
      // });
      this.isAddNewGroup = false;
      this.isGroupEdit = false;
      this.groupName = '';
      this.groupDescription = '';
      this.getGroupList();
    }
  }
  handleTabChange(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  getSubGroupList() {
    this.mailBoxService.getSubGroupListDesc().subscribe({
      next: (response) => {
        this.subGroupList = response;
        this.subGroupListControl.setValue('');

        this.filteredSubGroupOptions =
          this.subGroupListControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
              if (this._filterSubGroups(value || '').length === 0) {
                this.subGroupDescription = '';
              }
              return this._filterSubGroups(value || '');
            })
          );
      },
      error: (response) => {},
    });
  }
  handleSubGroupSelection() {
    const selectedSubGroup = this.subGroupList.find(
      (group) => this.subGroupListControl.value === group.field
    );
    this.subGroupDescription = selectedSubGroup?.description;
    this.subGroupName = this.subGroupListControl?.value!;
    return;
  }

  handleSubGroupEdit() {
    this.isSubGroupEdit = true;
    this.isAddNewSubGroup = false;
  }

  handleAddNewSubGroup() {
    this.isAddNewSubGroup = true;
    this.isSubGroupEdit = false;
  }
  handleSubGroupSave() {
    if (this.isSubGroupEdit) {
      const selectedSubGroup = this.groupListControl?.value;
      const newSubGroupName = this.groupName;
      const newSubGroupDescripion = this.groupDescription;

      console.log(
        'EDIT',
        selectedSubGroup,
        newSubGroupName,
        newSubGroupDescripion
      );
      this.isAddNewSubGroup = false;
      this.isSubGroupEdit = false;
      this.subGroupName = '';
      this.subGroupDescription = '';
      this.getGroupList();
      // this.mailBoxService.editGroup().subscribe({
      //   next: (response) => {
      //     this.notificationService.showSuccess('Group edited succesfully', 5);
      //   },
      //   error: (error) => {
      //     this.notificationService.showError('Somthing went wrong', 5);
      //   },
      // });
    }
    if (this.isAddNewGroup) {
      const newSubGroupName = this.groupName;
      const newSubGroupDescripion = this.groupDescription;
      const data = {
        group_name: newSubGroupName,
        description: newSubGroupDescripion,
      };
      console.log('ADD', newSubGroupName, newSubGroupDescripion);
      this.mailBoxService.addNewGroup(data).subscribe({
        next: (response) => {
          this.getGroupList();
          this.notificationService.showSuccess('Group edited succesfully', 5);
        },
        error: (error) => {
          this.notificationService.showError('Somthing went wrong', 5);
        },
      });
      this.isAddNewSubGroup = false;
      this.isSubGroupEdit = false;
      this.subGroupName = '';
      this.subGroupDescription = '';
      // this.getGroupList();
    }
  }
}
