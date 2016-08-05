import {Component,ViewChild} from '@angular/core';
import {NavController,Nav} from 'ionic-angular';
import {TranslatePipe,TranslateService} from "ng2-translate/ng2-translate";
 import {Page1} from '../page1/page1';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages:any;
  rootPage: any = Page1;
  constructor(private navCtrl: NavController,private translate: TranslateService) {
 this.pages = [
      { title: 'My Account', component: Page1 },
      { title: 'Logout', component: Page1 }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
