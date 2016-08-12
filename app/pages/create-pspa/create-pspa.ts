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
     public base64Images: any;
 
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice:ReportService) {
    this.report=this.navparams.get("report");
    this.user=this.navparams.get("user");
    this.pspa.site=this.report.site.title;
  this.pspa.author=this.user.firstname+" "+this.user.lastname;
  this.base64Images=[];
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
   this.step=1;
    this.statues=[
                  {
                    value: "Lafarge",
                    title:"Lafarge"  
                  },
                  {
                    value: "Fournisseur",
                    title:"Fournisseur"  
                  },
                  {
                    value: "Transporteur",
                    title:"Transporteur"  
                  }
    ];
       this.fonctions=[
                  {
                    value: "Agent",
                    title:"Agent"  
                  },
                  {
                    value: "Administrateur",
                    title:"Administrateur"  
                  },
                  {
                    value: "Manager",
                    title:"Manager"  
                  }
    ];

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
