import {Component, ViewChild} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";
import {LoginService} from '../../providers/login-service/login-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  public user;
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams,private loginservice:LoginService) {
    this.user=this.navparams.get("user");

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
