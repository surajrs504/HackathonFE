import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import mail_data from '../../../core/data/mail_data.json';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

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

  getGroupList() {
    return this.http.get(`${this.apiUrl}NVPreference/get_groups`);
  }

  getSubGroupList() {
    return of(['Priority', 'Urgency', 'Client', 'Team']);
  }

  getMailList() {
    // return of(mail_data)
    return this.http.get(`${this.apiUrl}NVMail/getMail`);
  }

  getMailSummary(mailDetails: any) {
    return this.http.post<any>(`${this.apiUrl}NVGroup/getMailSummary`, mailDetails);
  }

  getMailAIResponse(mailDetails: any) {
    return this.http.post<any>(`${this.apiUrl}/NVGroup/getMailResponse`, mailDetails);
  }

  addNewGroup(data: any) {
    return this.http.post(`${this.apiUrl}NVPreference/addGroup`, data);
  }

  editGroup(data: any) {
    return this.http.put(`${this.apiUrl}NVPreference/edit_group`, data);
  }

  getSubGroupListDesc() {
    return of([
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
    ]);
  }

  deleteGroup(group_id: number) {
    return this.http.delete(
      `${this.apiUrl}NVPreference/delete_group/${group_id}`
    );
  }
  getMailByGroup(id: any) {
    return this.http.get(`${this.apiUrl}NVGroup/getGroupEmail?group_id=${id}`);
  }
}
