import { Component, OnInit } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {CreatePspaPage} from '../create-pspa/create-pspa';

@Component({
  templateUrl: 'build/pages/report/report.html',
  pipes: [TranslatePipe],
})
export class ReportPage implements OnInit {

    submitted = false;
    report: { line?: string, agency?: string, site?: string } = {};
    sites:any;
    lines:any;
    agences:any;
    step:string="first";
    user:any;

  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams) {
    this.user=this.navparams.get("user");

  }
  ngOnInit() {
    this.sites=[
                  {
                    value: "site1",
                    title:"Site 1"  
                  },
                  {
                    value: "site2",
                    title:"Site 2"  
                  },
                  {
                    value: "site3",
                    title:"Site 3"  
                  }
    ];
       this.agences=[
                  {
                    value: "agence1",
                    title:"Agence 1"  
                  },
                  {
                    value: "agence2",
                    title:"Agence2"  
                  },
                  {
                    value: "agence3",
                    title:"Agence 3"  
                  }
    ];
       this.lines=[
                  {
                    value: "line1",
                    title:"Ligne 1"  
                  },
                  {
                    value: "line2",
                    title:"Ligne 2"  
                  },
                  {
                    value: "line",
                    title:"Ligne 3"  
                  }
    ];
  }

  addVFL(form){
 this.submitted = true;
 if (form.valid) {
  this.nav.push(CreatePspaPage, { report: this.report });
  }
  }

addPASA(form){
 this.submitted = true;
 if (form.valid) {
  this.nav.push(CreatePspaPage, { report: this.report ,user:this.user});
  }
  }
}
