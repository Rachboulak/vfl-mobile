import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SearchPage} from "../search/search";
import {ReportPage} from "../report/report";
@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  public user;
  constructor(navparams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.user = navparams.data;
    this.tab1Root = HomePage;
    this.tab2Root = ReportPage;
    this.tab3Root = SearchPage;
  }
}
