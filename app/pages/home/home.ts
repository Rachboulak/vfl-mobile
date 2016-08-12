import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";
import {LoginService} from '../../providers/login-service/login-service';
import { ReportService, Report } from '../../providers/report-service/report-service';
@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  public user;
  reports: Report[];
  reportService;
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams,private loginservice:LoginService,
  reportService: ReportService) {
    console.log('  HomePage constructor ');
    this.reportService = reportService;
    this.user=this.navparams.get("user");    
  }

    // Initialise the notes by loading data from our DB
  private loadReports() {
    this.reports = [];
    this.reportService.getAllReports().then(
      data => {
        this.reports = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.reports.push(new Report(item.line, item.site, item.agence, item.id));
          }
        }
      });
      console.log(' Load reports ',this.reports );
      
  }
 
  onPageDidEnter (){
    console.log('onPageDidEnter');
    //this.loadReports();
  }
  onPageLoaded() {
    console.log('onPageLoaded');
    this.loadReports();
  }
  /*ngOnInit() {
    this.reports=[
            {
              line: "ligne 1",
              site:"site 1" ,
              agency: "agency 1"
            },
            {
              line: "ligne 2",
              site:"site 2" ,
              agency: "agency 2"
            }
            
            ];
  }*/

  doLogout() {
    this.loginservice.logout();
    
  this.navCtrl.setRoot(LoginPage).then((data)=>{
    console.log(JSON.stringify(data));
    this.navCtrl.popToRoot();
  }); 

  }
  goToReportPage() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(ReportPage,{user:this.user});

  }
  goToAccountPage() {
    this.loginservice.getUser( (data) => {      
                    this.navCtrl.push(ProfilePage,{user:data.rows.item(0)});
            }, (error) => { console.log(error);
              
            });
  }
  goToSearchPage() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(SearchPage);

  }
  
}