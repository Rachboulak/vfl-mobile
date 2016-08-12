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
    pspa:{line?:any ,  agency?:any , site?:any ,  author?:any , date?:any , remonted_by?:any , fonction?:any , status?:any , type?:any , description?:any ,  ent_pers_imp?:any , material_imp?:any , material?:any , type_report?:any , company_name?:any , risque_qualification?:any , zone?:any , image?:any , action?:any ,  solution?:any , risk?:any , sub_risk}={};
    statues:any;
    fonctions:any;
    step:number;
     public base64Image: string;
 
  constructor(private nav: NavController, private translate: TranslateService,private navparams:NavParams,private reportservice:ReportService) {
    this.report=this.navparams.get("report");
    this.user=this.navparams.get("user");
    this.pspa.site=this.report.site.title;
  this.pspa.author=this.user.firstname+" "+this.user.lastname;
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
  
    takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
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
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
}
