import { Component, OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {ReportService, Report, SearchReport} from '../../providers/report-service/report-service';
import {ConsultReportTabsPage} from "../consult-report-tabs/consult-report-tabs";

@Component({
  templateUrl: 'build/pages/search/search.html',
  pipes: [TranslatePipe],
})
export class SearchPage implements OnInit {

    submitted = false;
    report: {id?:any, line?: any, agency?: any, site?: any } = {};
    sites:any;
    lines:any;
    agencies:any;
    public results : Report[];
  constructor(private navCtrl: NavController,
           private translate: TranslateService,private navparams:NavParams,
           private reportService: ReportService) {
  }
 
  ngOnInit() {
    this.sites=[];
    this.agencies=[];
    this.lines=[];
    this.results=[];
    this.reportService.getProductLines(
          (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.lines.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

  getResults(form){
    this.submitted = true;
    if (form.valid) {
      this.reportService.search(
        new SearchReport(this.report.line.id, this.report.agency.id,this.report.site.id)
        , (data) => {  
                for(var i=0; i<data.rows.length;i++){
                  this.results.push(data.rows.item(i));
                }
          }, (error) => {
                console.log("error",error);
          });  
    }
  }

   updateAgencies(param){
      this.reportService.getAgenciesByProductLineID(param.id,(data) => {
        this.agencies=[];
         this.sites=[];
                 for(var i=0; i<data.rows.length;i++){
                    this.agencies.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

   updateSites(param){
     this.sites=[];
      this.reportService.getSitesByAgencyID(param.id,(data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.sites.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }


  consultReport(report){
    this.reportService.getReportById(report.id,
      (data)=>{
        this.navCtrl.push(ConsultReportTabsPage,{report:data.rows.item(0)});
      }
    );
  }  
}