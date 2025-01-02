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

  addNewGroup(){
    return of()
  }

  editGroup(){
    return of()
  }

  getGroupListDesc(){
    return of( [
        {
          field: 'Priority',
          description:
            'Indicates the level of importance or urgency of a task, usually categorized as High, Medium, or Low.',
        },
        {
          field: 'Urgency',
          description:
            'Represents the time sensitivity of a task. It refers to how quickly a task needs to be completed, typically categorized as Immediate, Soon, or Later.',
        },
        {
          field: 'Urgency',
          description:
            'This is another reference to the urgency level, often used interchangeably with priority but may reflect specific deadlines or conditions.',
        },
        {
          field: 'Team',
          description:
            'Refers to the group of people responsible for completing the task or project, typically based on skills or department.',
        },
        {
          field: 'Project',
          description:
            'Describes the larger initiative or goal that a task or set of tasks is contributing to, often including specific objectives, timelines, and deliverables.',
        },
      ])
  }
  getSubGroupListDesc(){
    return of( [
      {
        field: 'Priority',
        description:
          'Indicates the level of importance or urgency of a task, usually categorized as High, Medium, or Low.',
      },
      {
        field: 'Urgency',
        description:
          'Represents the time sensitivity of a task. It refers to how quickly a task needs to be completed, typically categorized as Immediate, Soon, or Later.',
      },
      {
        field: 'Urgency',
        description:
          'This is another reference to the urgency level, often used interchangeably with priority but may reflect specific deadlines or conditions.',
      },
      {
        field: 'Team',
        description:
          'Refers to the group of people responsible for completing the task or project, typically based on skills or department.',
      },
      {
        field: 'Project',
        description:
          'Describes the larger initiative or goal that a task or set of tasks is contributing to, often including specific objectives, timelines, and deliverables.',
      },
    ])
  }
}
