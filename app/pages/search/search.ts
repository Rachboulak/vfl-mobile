import { Component, OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {ReportService, Report, SearchReport} from '../../providers/report-service/report-service';
import {ConsultReportPage} from "../consult-report/consult-report";

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
           private reportservice: ReportService) {
  }
 
  ngOnInit() {
    this.sites=[];
    this.agencies=[];
    this.lines=[];
    this.results=[];
    this.reportservice.getProductLines(
          (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.lines.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

  getResults(form){
     this.reportservice.search(
       new SearchReport(this.report.line.id, this.report.agency.id,this.report.site.id)
       , (data) => {  
              for(var i=0; i<data.rows.length;i++){
                this.results.push(data.rows.item(i));
              }
        }, (error) => {
              console.log("error",error);
        });  
  }

   updateAgencies(param){
      this.reportservice.getAgenciesByProductLineID(param.id,(data) => {
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
      this.reportservice.getSitesByAgencyID(param.id,(data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.sites.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

    consultReport(report){
    this.reportservice.getReportById(report.id,
      (data)=>{
        this.navCtrl.push(ConsultReportPage,{report:data.rows.item(0)});
      }
    );
  }
}