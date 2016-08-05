import {Component, ViewChild} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  public user;
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams) {
    this.user=this.navparams.get("user");
    
  }

  doLogout() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(LoginPage);

  }
  goToReportPage() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(ReportPage);

  }
  goToAccountPage() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(ProfilePage);

  }
  goToSearchPage() {
    //this.loginservice.dologin(user,this.nav);
    this.navCtrl.push(SearchPage);

  }
  
}
