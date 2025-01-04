import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from '../../../core/services/common/common.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mail-search-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './mail-search-bar.component.html',
  styleUrl: './mail-search-bar.component.scss',
})
export class MailSearchBarComponent implements OnChanges {
  @Input('mail_data') mail_data: any;
  @Output('selectedMail') selectedMail = new EventEmitter<any>();

  searchMailControl = new FormControl();
  filteredMailSearchOptions: Observable<any[]> | undefined;

  private commonService = inject(CommonService);

  ngOnChanges(changes: SimpleChanges): void {
    console.log('searchbar change', changes);
    if (changes['mail_data'].currentValue) {
      this.filteredMailSearchOptions = this.searchMailControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterMailSearch(value || ''))
      );
    }
  }

  getFirstLetter(mailDetails: any) {
    const letter = mailDetails["message"]["sender"]["emailAddress"]["address"];
    return letter.charAt(0).toUpperCase();
  }

  getLetterColor(firstLetter: string) {
    return this.commonService.getLetterColor(firstLetter);
  }

  private _filterMailSearch(value: any) {
    let filterValue = '';
    if (typeof value !== 'string') {
      return;
    } else {
      filterValue = value.toLowerCase();
    }
    return this.mail_data?.filter(
      (option: any) =>
        option["message"]["sender"]["emailAddress"]["address"]
          .toLowerCase()
          .includes(filterValue) ||
        option["message"]['subject'].toLowerCase().includes(filterValue)
    );
  }
  displayMailWith(option: any): string {
    return option ? option["message"]["sender"]["emailAddress"]["address"] : '';
  }

  handleMailSelection(data: any) {
    console.log('selectmail', this.searchMailControl.value, data);
    this.selectedMail.emit(this.searchMailControl.value);
    // this.searchMailControl.setValue(
    //   this.searchMailControl.value['sender']['emailAddress']['name']
    // );
  }
  handled(data: any) {
    return '';
  }
}
