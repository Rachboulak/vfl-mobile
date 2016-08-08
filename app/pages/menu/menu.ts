import {Component,ViewChild} from '@angular/core';
import {NavController,Nav} from 'ionic-angular';
import {TranslatePipe,TranslateService} from "ng2-translate/ng2-translate";
 import {Page1} from '../page1/page1';
import {LoginPage} from '../login/login';
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {ReportPage} from "../report/report";
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/menu/menu.html',
  pipes: [TranslatePipe]
})
export class MenuPage {
 @ViewChild(Nav) nav: Nav;
  pages:any;
  rootPage: any = ProfilePage;
  constructor(private navCtrl: NavController,private translate: TranslateService) {
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Ajouter un rapport', component: ReportPage },
      { title: 'My Account', component: ProfilePage },
      { title: 'Visualiser un rapport', component: SearchPage }
      
      
    ];
  }
openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
