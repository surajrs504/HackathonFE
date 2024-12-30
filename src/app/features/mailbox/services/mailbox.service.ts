import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import mail_data from '../../../core/data/mail_data.json'

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  constructor() {}

  deleteSingleMail(mailDetails: any) {}

  flagMail(mailDetails: any) {}

  deleteSelectedMails() {}

  getFrequentGroupList() {
    return of([
      { name: 'apple' },
      { name: 'banana' },
      { name: 'strawberry' },
      { name: 'orange' },
      { name: 'kiwi' },
      { name: 'cherry' },
    ]);
  }

  getGroupList(){
    return of(['Priority', 'Urgency', 'Client', 'Team', 'Project']);
  }

  getSubGroupList(){
    return of(['Priority', 'Urgency', 'Client', 'Team']);
  }

  getMailList(){
   return of(mail_data)
  }

  getMailSummary(mailDetails:any){
   return of('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem mollitia nemo illum ut veniam cum voluptatum id unde vero porro esse quae officia praesentium fugit tenetur temporibus iste, dolore voluptatibus.')
  }

  getMailAIResponse(mailDetails:any){
   return  of('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem mollitia nemo illum ut veniam cum voluptatum id unde vero porro esse quae officia praesentium fugit tenetur temporibus iste, dolore voluptatibus.')
  }
}
