import { Component, OnInit,ViewChild} from '@angular/core';
import { NavController, Page, NavParams, Slide,Slides} from 'ionic-angular';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";
import {ReportService} from '../../providers/report-service/report-service';
import {Camera} from 'ionic-native';

@Component({
    templateUrl: 'build/pages/create-pspa/create-pspa.html',
})
export class CreatePspaPage implements OnInit {
    @ViewChild('mySlider') slider: Slides;
    user: any;
    submitted = false;
    report: { id?: any, line?: any, agency?: any, site?: any } = {};
    pspa: {
        line?: any, agency?: any, site?: any, author?: any,
        date?: any, remonted_by?: any, fonction?: any,
        status?: any, type?: any, description?: any,
        ent_pers_imp?: any, material_imp?: any,
        material?: any, type_report?: any,
        company_name?: any, risque_qualification?: any,
        zone?: any, image?: any, action?: any,
        solution?: any, risk?: any, sub_risk?: any
    } = {};
    statues: any;
    fonctions: any;
    step: number;
    base64Images: any;
    risks: any;
    zones: any;
    subrisks: any;
    risque_qualifications: any;
    risque_qualification: any;
    mySlideOptions: any;

    constructor(private nav: NavController, private translate: TranslateService, private navparams: NavParams, private reportservice: ReportService) {
        this.mySlideOptions = {
            initialSlide: 1,
            loop: false
        };
    }

    nextStep(form) {
        this.submitted = true;
        if (form.valid) {
            this.step = this.step + 1;
            this.submitted = false;
        }
    }

    Done(form) {
        this.submitted = true;
        if (form.valid) {
            this.pspa.image = JSON.stringify(this.base64Images);
            this.reportservice.addPASA(this.pspa,
                (data) => {
                    this.nav.pop();
                    console.log("created pspa :", this.pspa)
                }, (error) => {
                    console.log("error", error);
                });
        }
    }
    previousStep(form) {
        this.step = this.step - 1;
        this.submitted = false;
    }
    ngOnInit() {
        this.submitted = false;
        this.report = this.navparams.get("report");
        console.log(this.report);
        this.user = this.navparams.get("user");
        this.pspa.line = this.report.line;
        this.pspa.agency = this.report.agency;
        this.pspa.site = this.report.site;
        this.pspa.author = this.user;
        this.pspa.risque_qualification = 1;
        this.pspa.company_name = null;
        this.pspa.material = null;
        this.pspa.material_imp = true;
        this.base64Images = [];
        this.step = 1;
        this.statues = [];
        this.fonctions = [];
        this.subrisks = [];
        this.risks = [];
        this.zones = [];

        this.risque_qualifications = [{
            label: "Faible",
            class: "low"
        }, {
                label: "Jaune",
                class: "yellow"
            }, {
                label: "Rouge",
                class: "red"
            }, {
                label: "Noir",
                class: "black"
            }
        ];
        this.risque_qualification = this.risque_qualifications[0];
        //init statues
        this.reportservice.getStatues(
            (data) => {
                for (var i = 0; i < data.rows.length; i++) {
                    this.statues.push(data.rows.item(i));
                }
            }, (error) => {
                console.log("error", error);
            });
        //init functions
        this.reportservice.getFunctions(
            (data) => {
                for (var i = 0; i < data.rows.length; i++) {
                    this.fonctions.push(data.rows.item(i));
                }
            }, (error) => {
                console.log("error", error);
            });
        //init risks
        this.reportservice.getRisks(
            (data) => {
                for (var i = 0; i < data.rows.length; i++) {
                    this.risks.push(data.rows.item(i));
                }
            }, (error) => {
                console.log("error", error);
            });
        //init regions
        this.reportservice.getZones(
            (data) => {
                for (var i = 0; i < data.rows.length; i++) {
                    this.zones.push(data.rows.item(i));
                }
            }, (error) => {
                console.log("error", error);
            });



    }

    updateSubRisks(event) {
        this.reportservice.getSubRisksByRiskID(event, (data) => {
            this.subrisks = [];
            for (var i = 0; i < data.rows.length; i++) {
                this.subrisks.push(data.rows.item(i));
            }
        }, (error) => {
            console.log("error", error);
        });
    }

    takePicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Images.push("data:image/jpeg;base64," + imageData);
        }, (err) => {
            console.log(err);
        });
    }

    removePicture(base64Image) {
        var index = this.base64Images.indexOf(base64Image);
        let currentIndex = this.slider.getActiveIndex();
        this.base64Images.splice(currentIndex, 1);
        this.slider.slideNext(100);
        this.slider.slidePrev(100);
        
        console.log("removed!");
    }
    uploadPicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Images.push("data:image/jpeg;base64," + imageData);
        }, (err) => {
            console.log(err);
        });
    }
    setRiskQualification(param) {
        this.risque_qualification = this.risque_qualifications[this.pspa.risque_qualification - 1];
    }
}
