import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";
import {LoginService} from '../../providers/login-service/login-service';
import { ReportService } from '../../providers/report-service/report-service';
@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage implements OnInit {
  public user;
  public reports;
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams,private loginservice:LoginService,
  reportService: ReportService) {
    this.user=this.navparams.get("user");
   //this.reports = reportService.getAllReports();
    console.log('user ', this.user);
    console.log('reports ', this.reports);
    
  }

  ngOnInit() {
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
  }

  doLogout() {
    this.loginservice.logout();
    
  this.navCtrl.popToRoot(); 

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
