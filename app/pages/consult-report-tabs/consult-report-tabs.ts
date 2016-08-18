import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {ConsultReportPage} from '..//consult-report//consult-report';



@Component({
  templateUrl: 'build/pages/consult-report-tabs/consult-report-tabs.html',
})
export class ConsultReportTabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  private tab1RootParams:any;
  private tab2RootParams:any;
  private tab3RootParams:any;
  constructor(navparams: NavParams) {

    this.tab1RootParams={report:navparams.get("report"),step:1};
    this.tab2RootParams={report:navparams.get("report"),step:2};
    this.tab3RootParams={report:navparams.get("report"),step:3};
    
    this.tab1Root = ConsultReportPage;
    this.tab2Root = ConsultReportPage;
    this.tab3Root = ConsultReportPage;
  }

}
