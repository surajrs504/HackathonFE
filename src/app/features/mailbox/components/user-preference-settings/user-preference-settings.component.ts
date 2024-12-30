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
  groupList: any[] = [
    { field: 'Priority', description: 'Indicates the level of importance or urgency of a task, usually categorized as High, Medium, or Low.' },
    { field: 'Urgency', description: 'Represents the time sensitivity of a task. It refers to how quickly a task needs to be completed, typically categorized as Immediate, Soon, or Later.' },
    { field: 'Urgency', description: 'This is another reference to the urgency level, often used interchangeably with priority but may reflect specific deadlines or conditions.' },
    { field: 'Team', description: 'Refers to the group of people responsible for completing the task or project, typically based on skills or department.' },
    { field: 'Project', description: 'Describes the larger initiative or goal that a task or set of tasks is contributing to, often including specific objectives, timelines, and deliverables.' }
  ];
  subGroupList: string[] = ['Priority', 'Urgency', 'Client', 'Team', 'Project'];
  filteredGroupOptions: Observable<string[]> | undefined;
  groupListControl = new FormControl('');

  isGroupEdit = false;
  isAddNewGroup = false;
  constructor(
    public userPreferenceRef: MatDialogRef<UserPreferenceSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.filteredGroupOptions = this.groupListControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGroups(value || ''))
    );
  }
  private _filterGroups(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groupList.filter((option) =>
      option.field.toLowerCase().includes(filterValue)
    );
  }
  handleRemoveGroup(keyword: string) {
    this.groupList = this.groupList.filter((k) => k !== keyword);
  }

  handleRemoveSubGroup(keyword: string) {
    this.subGroupList = this.subGroupList.filter((k) => k !== keyword);
  }

  closeDialog() {
    this.userPreferenceRef.close();
  }

  handleAddNewGroup() {
    this.isGroupEdit = false;
    this.isAddNewGroup = true;
  }

  saveGroupChanges() {}

  handleAddNewSubGroup() {}

  saveSubGroupChanges() {}

  handleGroupEdit() {
    this.isGroupEdit = true;
  }

  handleGroupSelection(selection: any) {
    console.log('selection', this.groupListControl.value);
  }
}
