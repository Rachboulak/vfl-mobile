import { Component ,OnInit} from '@angular/core';
import { NavController ,Page, NavParams } from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {ReportService} from '../../providers/report-service/report-service';
import {Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/create-pspa/create-pspa.html',
})
export class CreatePspaPage  implements OnInit {
    user:any;
    submitted = false;
    report: { id?:any,line?: any, agency?: any, site?: any } = {};
    pspa:{line?:any,agency?:any,site?:any ,author?:any ,
       date?:any , remonted_by?:any , fonction?:any ,
        status?:any , type?:any , description?:any , 
         ent_pers_imp?:any , material_imp?:any ,
          material?:any , type_report?:any , 
          company_name?:any , risque_qualification?:any ,
           zone?:any , image?:any , action?:any ,
             solution?:any , risk?:any , sub_risk?: any}={};
    statues:any;
    fonctions:any;
    step:number;
    base64Images: any;
    risks:any;
    subrisks:any;
    risque_qualifications:any;
 
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice:ReportService) {

  }

nextStep(form){
    if(form.valid){
          this.step=this.step+1;
          this.submitted=false;
    }
}
previousStep(form){

this.step=this.step-1;
this.submitted=false;

}
 ngOnInit() {
    this.report=this.navparams.get("report");
    this.user=this.navparams.get("user");
    this.pspa.site=this.report.site;
    this.pspa.author=this.user;
    this.pspa.risque_qualification=1;
    this.base64Images=[];
    this.step=1;
    this.statues=[];
    this.fonctions=[];
    this.subrisks=[];
    this.risks=[];
    this.risque_qualifications=["Faible","Jaune","Rouge","Noir"]


    this.reportservice.getStatues(
      (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.statues.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });

    this.reportservice.getFunctions(
      (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.fonctions.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });

    this.reportservice.getRisks(
      (data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.risks.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });



  }

  updateSubRisks(event){
    this.reportservice.getSubRisksByRiskID(event,(data) => {           
                 for(var i=0; i<data.rows.length;i++){
                    this.subrisks.push(data.rows.item(i));
                 }
            }, (error) => {
                 console.log("error",error);
            });
  }

    takePicture(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
          // imageData is a base64 encoded string
            this.base64Images.push( "data:image/jpeg;base64," + imageData);
        }, (err) => {
            console.log(err);
        });
  }

  uploadPicture(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
          // imageData is a base64 encoded string
            this.base64Images.push( "data:image/jpeg;base64," + imageData);
        }, (err) => {
            console.log(err);
        });
  }
}
