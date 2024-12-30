import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonService } from '../../../../core/services/common/common.service';
import { MailboxService } from '../../services/mailbox.service';
@Component({
  selector: 'app-mail-list-cell',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatCheckboxModule, MatTooltipModule],
  templateUrl: './mail-list-cell.component.html',
  styleUrl: './mail-list-cell.component.scss',
})
export class MailListCellComponent {
  @Input('cellDetail') cellDetail: any;
  @Input('isSelectAllEnabled') isSelectAllEnabled: boolean = false;
  @Input('isSelected') isSelected: boolean = false;
  commonService = inject(CommonService);
  mailboxService = inject(MailboxService)
  constructor() {}

  getFirstLetter() {
    const letter = this.cellDetail['sender']['emailAddress']['name'];
    return letter.charAt(0).toUpperCase();
  }
  getTime(dateString: any) {
    const date = new Date(dateString);

    // Get the day, month (zero-indexed, so add 1), hour, and minute
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are 0-indexed (0 = January, 11 = December)
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Format the result
    const formattedDate = `${day}-${month} ${hour}:${minute}`;
    return formattedDate;
  }

  getLetterColor(firstLetter: string) {
    return this.commonService.getLetterColor(firstLetter);
  }

  handleDeleteMail(mailDetails: any) {
    this.mailboxService.deleteSingleMail(mailDetails);
  }
}
