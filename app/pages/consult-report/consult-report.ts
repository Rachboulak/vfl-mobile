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
  more:{description?: boolean, action?: boolean, solution?: boolean}={};

  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams) {
    this.report=this.navparams.get("report");
    console.log(this.navparams.get("step"));
    this.step=this.navparams.get("step");
    this.mySlideOptions = {
    initialSlide: 1,
    loop: false
  }; 
  this.base64Images=JSON.parse(this.report.image);
  this.more.description=false;
  this.more.action=false;
  this.more.solution=false;
  }
showMore(model){
  this.more[model] = true;
}
hideMore(model){
  this.more[model]=false;

}
}
