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

  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice: ReportService) {
    this.user=this.navparams.get("user");
    
  }
 
  ngOnInit() {
    this.sites=[];
    this.agencies=[];
    this.lines=[];
                 /* {
                    value: "bétons",
                    title:"bétons" ,
                    agencies: [
                                {
                                  value: "Casablanca",
                                  title:"Casablanca",
                                  sites:[
                                        {
                                          value: "Central à Béton Mouhammedia",
                                          title:"Central à Béton Mouhammedia"  
                                        },
                                        {
                                          value: "Central à Béton Bouskoura",
                                          title:"Central à Béton Bouskoura"  
                                        },
                                        {
                                          value: "Central à Béton Ain Sebaa",
                                          title:"Central à Béton Ain Sebaa"  
                                        }
                                      ]
                                },
                                {
                                  value: "Rabat",
                                  title:"Rabat"  ,
                                  sites:[
                                        {
                                          value: "Central à Béton Rabat",
                                          title:"Central à Béton Rabat"  
                                        },
                                        {
                                          value: "Central à Béton Agdal ",
                                          title:"Central à Béton Agdal"  
                                        },
                                        {
                                          value: "Central à Béton Temara",
                                          title:"Central à Béton Temara"  
                                        }
                                      ]
                                },
                                {
                                  value: "Tanger",
                                  title:"Tanger"  ,
                                  sites:[
                                        {
                                          value: "Site de Tétouan",
                                          title:"Site de Tétouan"  
                                        },
                                        {
                                          value: "Site de Tanger",
                                          title:"Site de Tanger"  
                                        },
                                        {
                                          value: "Central à Béton Tanger ",
                                          title:"Central à Béton Tanger"  
                                        }
                                      ]
                                }
                            ]
                  },
                  {
                    value: "granulats",
                    title:"granulats" ,
                    agencies: [
                                {
                                  value: "Casablanca",
                                  title:"Casablanca" ,
                                  sites:[
                                        {
                                          value: "Usine Bouskoura",
                                          title:"Usine Bouskoura"  
                                        },
                                        {
                                          value: "Centre de distribution Khouribga",
                                          title:"Centre de distribution Khouribga"  
                                        },
                                        {
                                          value: "Usine Mouhammedia",
                                          title:"Usine Mouhammedia"  
                                        }
                                      ]
                                },
                                {
                                  value: "Eljadida",
                                  title:"Eljadida"  ,
                                  sites:[
                                        {
                                          value: "Usine Eljadida",
                                          title:"Usine Eljadida"  
                                        },
                                        {
                                          value: "Usine Safi",
                                          title:"Usine Safi"  
                                        },
                                        {
                                          value: "Centre de distribution Safi",
                                          title:"Centre de distribution Safi"  
                                        }
                                      ]
                                },
                                {
                                  value: "Tanger",
                                  title:"Tanger"  ,
                                  sites:[
                                        {
                                          value: "Usine Tanger",
                                          title:"Usine Tanger"  
                                        },
                                        {
                                          value: "Usine Tétouan",
                                          title:"Usine Tétouan"  
                                        },
                                        {
                                          value: "Centre de distribution Tanger",
                                          title:"Centre de distribution Tanger"  
                                        }
                                      ]
                                }
                            ]
                  }*/
    
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
    this.submitted = true;
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
      }
  }

  addPASA(form){
    this.submitted = true;
    if (form.valid) {  
      this.nav.push(CreatePspaPage, { report: this.report ,user:this.user});
      }
      }

   updateAgencies(param){
      this.reportservice.getAgenciesByProductLineID(param.id,(data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.agencies.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

   updateSites(param){
      this.reportservice.getSitesByAgencyID(param.id,(data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.sites.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }
}
