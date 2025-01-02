import { Component, inject, Input, input, OnInit } from '@angular/core';
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
  imports: [MatIconModule,MatAutocompleteModule,FormsModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './mail-search-bar.component.html',
  styleUrl: './mail-search-bar.component.scss'
})
export class MailSearchBarComponent implements OnInit {
  @Input('mail_data')mail_data:any
  ngOnInit(): void {
    this.filteredMailSearchOptions = this.searchMailControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMailSearch(value || ''))
    );
  }
   searchMailControl = new FormControl('');
   filteredMailSearchOptions: Observable<any[]> | undefined;

private commonService=inject(CommonService)

  getFirstLetter(mailDetails: any) {
    const letter = mailDetails['sender']['emailAddress']['name'];
    return letter.charAt(0).toUpperCase();
  }

  getLetterColor(firstLetter: string) {
    return this.commonService.getLetterColor(firstLetter);
  }

  private _filterMailSearch(value: any) {
      const filterValue = value.toLowerCase();
  
      return this.mail_data.filter(
        (option: any) =>
          option['sender']['emailAddress']['name']
            .toLowerCase()
            .includes(filterValue) ||
          option['subject'].toLowerCase().includes(filterValue)
      );
    }
}
