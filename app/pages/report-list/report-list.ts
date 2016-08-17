import { Component } from '@angular/core';

import { NavController, Page } from 'ionic-angular';

import { ReportService } from '../../providers/report-service/report-service';
//import { ReportDetailPage } from '../report-detail/report-detail';


@Component({
  templateUrl: 'build/pages/report-list/report-list.html'
})
export class ReportListPage {
  reports = [];

  constructor(public navCtrl: NavController, reportService: ReportService) {
    reportService.getAllReports();
  }

/*  goToReportDetail(speakerName: string) {
    this.navCtrl.push(ReportDetailPage, speakerName);
  }*/

}
