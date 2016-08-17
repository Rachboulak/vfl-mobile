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
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams) {
    this.report=this.navparams.get("report");
    this.mySlideOptions = {
    initialSlide: 1,
    loop: false
  };
  this.base64Images=JSON.parse(this.report.image);
  }

}