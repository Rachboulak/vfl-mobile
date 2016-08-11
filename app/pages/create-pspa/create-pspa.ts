import { Component ,OnInit} from '@angular/core';
import { NavController ,Page, NavParams } from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {ReportService} from '../../providers/report-service/report-service';

@Component({
  templateUrl: 'build/pages/create-pspa/create-pspa.html',
})
export class CreatePspaPage  implements OnInit {
  user:any;
    submitted = false;
    report: { id?:any,line?: any, agency?: any, site?: any } = {};
    pspa:{
      site?:any,author?:string,date?:string,remontedBy?:string,
      fonction?:string,status?:string,description?:string,type?:string,other?:boolean,material?:boolean,idreport?:any}={};
    statues:any;
    fonctions:any;
    step:string;
 
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice:ReportService) {
    this.report=this.navparams.get("report");
    this.user=this.navparams.get("user");
    this.pspa.site=this.report.site.title;
    this.pspa.idreport=this.report.id;
  this.pspa.author=this.user.firstname+" "+this.user.lastname;
  }

nextStep(form){
   console.log("!!!fffffffffffffff!!!!!");
  this.submitted = true;
if(form.valid){
  if(this.step=="first"){
this.step="second";
this.submitted=false;
  }
  if(this.step=="second"){
    console.log("!!!!!!!!!!!!!!");
    this.reportservice.addPASA(this.pspa,(data) => {           
                console.log("pspa added!",JSON.stringify(data));
            }, (error) => {
                 console.log("error",error);
            });
            this.submitted=false;
  }

}
}
previousStep(form){

this.step="first";
this.submitted=false;

}
 ngOnInit() {
   this.step="first";
    this.statues=[
                  {
                    value: "status1",
                    title:"Status 1"  
                  },
                  {
                    value: "status2",
                    title:"Status 2"  
                  },
                  {
                    value: "status3",
                    title:"Status 3"  
                  }
    ];
       this.fonctions=[
                  {
                    value: "fonction1",
                    title:"Fonction 1"  
                  },
                  {
                    value: "fonction2",
                    title:"Fonction 2"  
                  },
                  {
                    value: "fonction3",
                    title:"Fonction 3"  
                  }
    ];

  }
  
  private onPageDidEnter() {}
}
