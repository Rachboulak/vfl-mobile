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
    report: {id?:any, line?: any, agence?: any, site?: any } = {};
    sites:any;
    lines:any;
    agences:any;
    step:string="first";
    user:any;

  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice: ReportService) {
    this.user=this.navparams.get("user");
    
  }
 
  ngOnInit() {
    this.sites=[];
    this.agences=[];
         this.lines=[
                  {
                    value: "Ligne1",
                    title:"Ligne 1" ,
                    agencies: [
                                {
                                  value: "agence1",
                                  title:"Agence 1",
                                  sites:[
                                        {
                                          value: "Site",
                                          title:"Site 1"  
                                        },
                                        {
                                          value: "Site",
                                          title:"Site 2"  
                                        },
                                        {
                                          value: "Site",
                                          title:"Site 3"  
                                        }
                                      ]
                                },
                                {
                                  value: "agence2",
                                  title:"Agence2"  ,
                                  sites:[
                                        {
                                          value: "Site4",
                                          title:"Site 4"  
                                        },
                                        {
                                          value: "Site5",
                                          title:"Site 5"  
                                        },
                                        {
                                          value: "Site6",
                                          title:"Site 6"  
                                        }
                                      ]
                                },
                                {
                                  value: "agence3",
                                  title:"Agence 3"  ,
                                  sites:[
                                        {
                                          value: "Site34",
                                          title:"Site 34"  
                                        },
                                        {
                                          value: "Site35",
                                          title:"Site 35"  
                                        },
                                        {
                                          value: "Site36",
                                          title:"Site 36"  
                                        }
                                      ]
                                }
                            ]
                  },
                  {
                    value: "ligne2",
                    title:"Ligne 2" ,
                    agencies: [
                                {
                                  value: "agence6",
                                  title:"Agence 6" ,
                                  sites:[
                                        {
                                          value: "Site10",
                                          title:"Site 10"  
                                        },
                                        {
                                          value: "Site12",
                                          title:"Site 12"  
                                        },
                                        {
                                          value: "Site13",
                                          title:"Site 13"  
                                        }
                                      ]
                                },
                                {
                                  value: "agence13",
                                  title:"Agence13"  ,
                                  sites:[
                                        {
                                          value: "Site20",
                                          title:"Site 20"  
                                        },
                                        {
                                          value: "Site22",
                                          title:"Site 22"  
                                        },
                                        {
                                          value: "Site23",
                                          title:"Site 23"  
                                        }
                                      ]
                                },
                                {
                                  value: "agence8",
                                  title:"Agence 8"  ,
                                  sites:[
                                        {
                                          value: "Site10",
                                          title:"Site 10"  
                                        },
                                        {
                                          value: "Site12",
                                          title:"Site 12"  
                                        },
                                        {
                                          value: "Site13",
                                          title:"Site 13"  
                                        }
                                      ]
                                }
                            ]
                  }
    ];
  }

  addVFL(form){
 this.submitted = true;
 if (form.valid) {

    this.reportservice.addReport(this.report,(data) => {           
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
  //this.nav.push(CreatePspaPage, { report: this.report });
  }
  }

addPASA(form){
 this.submitted = true;
 console.log(JSON.stringify(this.report.line));
 if (form.valid) {  
  this.nav.push(CreatePspaPage, { report: this.report ,user:this.user});
  }
  }

   updateAgencies(param){
    console.log(param);
    this.agences=this.report.line.agencies;
  }
   updateSites(param){
    console.log(param);
    this.sites=this.report.agence.sites;
  }
}
