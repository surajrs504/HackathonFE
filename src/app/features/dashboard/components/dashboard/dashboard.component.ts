import { Component, ViewChild } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { PowerBIEmbedModule, PowerBIReportEmbedComponent } from 'powerbi-client-angular';

import { IReportEmbedConfiguration, models, service, Embed } from 'powerbi-client';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [QuillModule, PowerBIEmbedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    reportConfig: any = {
      type: 'report',
      embedUrl: '',
      tokenType: models.TokenType.Embed,
      accessToken: '',
      settings: undefined,
    };
    @ViewChild(PowerBIReportEmbedComponent)
    reportObj!: PowerBIReportEmbedComponent;
    eventHandlersMap = new Map([
      [
        'loaded',
        () => {
          const report = this.reportObj.getReport();
          report.setComponentTitle('Embedded report');
        },
      ],
      ['rendered', () => console.log('Report has rendered')],
      [
        'error',
        (event?: any) => {
          if (event) {
            console.error(event.detail);
          }
        },
      ],
      ['visualClicked', () => console.log('visual clicked')],
      ['pageChanged', (event) => ''],
    ]) as Map<
      string,
      (event?:any, embeddedEntity?: any) => void | null
    >;
  
    constructor() {}
  
    ngOnInit() {
      this.embedReport();
    }
  
    embedReport(){
       this.reportConfig = {
          ...this.reportConfig,
           accessToken: 'your token',
           id: 'your reportId',
           embedUrl: 'your embedUrl',
        };
    }
}
