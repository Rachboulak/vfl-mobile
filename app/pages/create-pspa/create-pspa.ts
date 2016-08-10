import { Component ,OnInit} from '@angular/core';
import { NavController ,Page, NavParams } from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/pages/create-pspa/create-pspa.html',
})
export class CreatePspaPage  implements OnInit {
  user:any;
    submitted = false;
    report: { line?: string, agency?: string, site?: string } = {};
    pspa:{
      site?:string,author?:string,date?:string,remontedBy?:string,
      fonction?:string,status?:string,description?:string,type?:string,other?:boolean,material?:boolean}={};
    statues:any;
    fonctions:any;
    step:string;
 
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams) {
    this.report=this.navparams.get("report");
    this.user=this.navparams.get("user");
    console.log(this.user);
    this.pspa.site=this.report.site;
  this.pspa.author=this.user.firstname+" "+this.user.lastname;
  }

nextStep(form){
  this.submitted = true;
if(form.valid){
this.step="second";
this.submitted=false;
}
}
previousStep(form){
  this.submitted = true;
if(form.valid){
this.step="first";
this.submitted=false;
}
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
