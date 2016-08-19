import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Nav, Platform,NavParams,Slide} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
/*
  Generated class for the ConsultReportPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/consult-report/consult-report.html',
})
export class ConsultReportPage {
  report:any;
  mySlideOptions:any;
  base64Images:any;
  step:number;
  risque_qualifications:any;
  risque_qualification:any;
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams) {
    this.risque_qualifications=[{
        label:"Faible",
        class:"low"
        },{
        label:"Jaune",
        class:"yellow"
        },{
        label:"Rouge",
        class:"red"
        },{
        label:"Noir",
        class:"black"
        }
        ];
    this.report=this.navparams.get("report");
    this.risque_qualification=this.risque_qualifications[this.report.risque_qualification-1];
    console.log(this.navparams.get("step"));
    console.log("rQ!!!!!",this.risque_qualification);
    this.step=this.navparams.get("step");
    this.mySlideOptions = {
    initialSlide: 1,
    loop: false
  };
  this.base64Images=JSON.parse(this.report.image);
  }

}
