import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";
import {ConsultReportPage} from "../consult-report/consult-report";
import {ConsultReportTabsPage} from "../consult-report-tabs/consult-report-tabs";
import {LoginService} from '../../providers/login-service/login-service';
import { ReportService, Report } from '../../providers/report-service/report-service';
import {ReportListPage} from "../report-list/report-list";

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage  implements OnInit{
  public user;
  reports: Report[];
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams,private loginservice:LoginService,
  private reportService: ReportService) {
    this.user=this.navparams.get("user");    
  }

    // Initialise the notes by loading data from our DB
  private loadReports() {
    this.reports = [];
    console.log("load reports");
    this.reportService.getAllReports(
      (data) => {
        this.reports = [];
        if (data.rows.length > 0) {
          console.log(data.rows);
          for (var i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            this.reports.push(new Report(item.line, item.site, item.agency,item.date, item.id));
          }
          // console.log(' Load reports ',this.reports );
        }
      });
     
      
  }
  ngOnInit() {
    console.log('nginit');
    
   
    
  }

  goToReportListPage () {
    this.navCtrl.push(ReportListPage,{user:this.user});
  }
    
  onPageDidEnter (){
    console.log('onPageDidEnter');
    this.reports = [];
      this.loadReports();
  }
  onPageLoaded() {
    console.log('onPageLoaded');
    
  }

  doLogout() {
    this.loginservice.logout();
    this.navCtrl.setRoot(LoginPage).then((data)=>{
    this.navCtrl.push(LoginPage,{});
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
    this.navCtrl.push(SearchPage);

  }

  consultReport(report){
    console.log("consult report",report);
    this.reportService.getReportById(report.id,
      (data)=>{
        console.log("heere!",report.id,data.rows);
        this.navCtrl.push(ConsultReportTabsPage,{report:data.rows.item(0)});
      }
    );
  }
 
  updateReport(report){
    console.log("update report",report);
    this.reportService.getReportById(report.id,
      (data)=>{
        console.log("report to update!",report.id,data.rows);
        this.navCtrl.push(ConsultReportTabsPage,{report:data.rows.item(0)});
      }
    );
  }

  /*deleteReport(report){
    console.log("delete report",report);
   

    this.reportService.DeleteReportById(report.id,
      (data)=>{
        console.log("deleted!!!!",data.rows);
      this.loadReports();
        
      }
    );
  }*/
}