import { Component, OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {CreatePspaPage} from '../create-pspa/create-pspa';
import {ReportService} from '../../providers/report-service/report-service';

@Component({
  templateUrl: 'build/pages/report/report.html',
  pipes: [TranslatePipe],
})
export class ReportPage implements OnInit {

    submitted = false;
    report: {id?:any, line?: any, agency?: any, site?: any } = {};
    sites:any;
    lines:any;
    agencies:any;
    step:string="first";
    user:any;

  constructor(private nav: NavController,
           private translate: TranslateService,private navparams:NavParams,
           private reportservice: ReportService) {
    this.user=this.navparams.get("user");
    
  }
 
  ngOnInit() {
    this.sites=[];
    this.agencies=[];
    this.lines=[];
    
    this.reportservice.getProductLines(
          (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.lines.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

  addVFL(form){
    console.log(' addVFL form ', form);
    /*this.submitted = true;
    if (form.valid) {
        this.reportservice.addReport(this.report,
                  (data) => {           
                    console.log("report added!",JSON.stringify(data));
                      this.reportservice.getID((data) => {           
                                  this.report.id=data.rows.item(0).id;
                                  console.log("id:",data.rows.item(0).id);
                              }, (error) => {
                                  console.log("error",error);
                              });
                }, (error) => {
                    console.log("error",error);
                });
      }*/
      
  }

  addPASA(form){
    console.log(' addPASA form ', form);
    this.submitted = true;
    if (form.valid) {  
      this.nav.push(CreatePspaPage, { report: this.report ,user:this.user});
      }
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
}
