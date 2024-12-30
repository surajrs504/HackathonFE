import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonService } from '../../../../core/services/common/common.service';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-mail-body',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
  templateUrl: './mail-body.component.html',
  styleUrl: './mail-body.component.scss',
})
export class MailBodyComponent implements OnChanges {
  @ViewChild('toolbar', { static: false }) toolbar: ElementRef | undefined;
  @Input('selectedMail') selectedMail: any;

  commonService = inject(CommonService);
  mailBoxService = inject(MailboxService);

  isMailReply = false;
  form = this.fb.group({
    html: '',
  });
  mailSummary: string = '';
  showToolbar = true;
  emailContent: string = '';
  quillModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ align: [] }],
      ['clean'],
    ],
  };
  showEditOption = false;
  isLoading=false

  constructor(private fb: FormBuilder) {}

  getCCRecepients() {
    let a = '';
    this.selectedMail['ccRecipients']?.forEach((mail: any) => {
      a += mail['emailAddress']['address'];
    });
    return a;
  }
  getToRecepients() {
    let a = '';
    this.selectedMail['toRecipients']?.forEach((mail: any) => {
      a += mail['emailAddress']['address'];
    });
    return a;
  }
  handleReplyMail() {
    this.isMailReply = !this.isMailReply;
  }

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
    const toolbar = this.toolbar?.nativeElement.querySelector(
      '.ql-toolbar.ql-snow'
    );
    if (this.showToolbar) {
      toolbar.style.display = 'block'; // Show the toolbar
    } else {
      toolbar.style.display = 'none'; // Hide the toolbar
    }
  }

  getFirstLetter() {
    const letter = this.selectedMail['sender']['emailAddress']['name'];
    return letter.charAt(0).toUpperCase();
  }

  getLetterColor(firstLetter: string) {
    return this.commonService.getLetterColor(firstLetter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['selectedMail']) {
      this.isMailReply = false;
    }
  }

  handleDeleteMail(mailDetails: any) {
    this.mailBoxService.deleteSingleMail(mailDetails);
  }
  handleFlagMail(mailDetails: any) {
    this.mailBoxService.flagMail(mailDetails);
  }
  handleTabChange(tabNumber: number) {
    console.log(tabNumber, 'dsds');
    if (tabNumber === 2) {
      this.getMailAIResponse(this.selectedMail);
      this.showEditOption = true;
      return;
    }
    if (tabNumber === 1) {
      this.getMailSummary(this.selectedMail);
    }
    this.showEditOption = false;
  }
  getMailAIResponse(mailDetails: any) {
    this.mailBoxService.getMailAIResponse(mailDetails).subscribe({
      next: (data) => {
        this.emailContent = data;
      },
      error: (error) => {},
    });
  }
  getMailSummary(mailDetails: any) {
    this.mailBoxService.getMailSummary(mailDetails).subscribe({
      next: (data) => {
        this.mailSummary = data;
      },
      error: (error) => {},
    });
  }

}
