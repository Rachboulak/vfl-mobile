import { Component, OnInit, ElementRef} from '@angular/core';

import { NavController, NavParams, Page } from 'ionic-angular';

import { ReportService, Report } from '../../providers/report-service/report-service';
//import { ReportDetailPage } from '../report-detail/report-detail';


@Component({
  templateUrl: 'build/pages/report-list/report-list.html',
  providers:[ReportService]
})
export class ReportListPage implements OnInit {
  reports: Report[];
  private start:number=0;
  private showButton = false;
  private ionScroll;
  constructor(public navCtrl: NavController, private navparams:NavParams, 
  
  public myElement: ElementRef, public reportService: ReportService) {
    this.reportService = reportService;
  }

  doInfinite(infiniteScroll) {
     console.log('doInfinite, start is currently ', this.start);
     var end = this.start+2;
    this.reportService.load(this.start,end, (data) => {  
                 for(var i=0; i<data.rows.length;i++){
                    this.reports.push(data.rows.item(i));
                 }
                 if(data.rows.length >0 ){
                   this.start+=data.rows.length;
                 }
                 infiniteScroll.complete();
            }, (error) => {
                 console.log("error",error);
            });
  }

  ngOnInit() {
    console.log(' ngOnInit ');
    this.reports = [];
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.children[1].firstChild;
    // On scroll function
    this.ionScroll.addEventListener("scroll", () => {
      if (this.ionScroll.scrollTop > window.innerHeight) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    });
    this.reports = [];
  }

  onPageDidEnter (){
    console.log(' onPageDidEnter ');
    this.loadReports();
  }

  /* goToReportDetail(speakerName: string) {
    this.navCtrl.push(ReportDetailPage, speakerName);
  }*/
  private loadReports() {
    console.log("ReportListPage loadReports this.reports = ", this.reports);
	  var end = this.start+5;
    this.reportService.load(this.start,end, (data) => {  
                 for(var i=0; i<data.rows.length;i++){
                    this.reports.push(data.rows.item(i));
                 }
                 if(data.rows.length >0 ){
                   this.start+=data.rows.length;
                 }
            }, (error) => {
                 console.log("error",error);
            });  
  }
  // Scroll to top function
  // Adapted from http://stackoverflow.com/a/24559613/5357459
  scrollToTop(scrollDuration) {
    let scrollStep = -this.ionScroll.scrollTop / (scrollDuration / 15);
    let scrollInterval = setInterval( () => {
        if ( this.ionScroll.scrollTop != 0 ) {
            this.ionScroll.scrollTop = this.ionScroll.scrollTop + scrollStep;
        } else {
          clearInterval(scrollInterval);
        }
    }, 15);
  }
}