import {Component, ViewChild} from '@angular/core';
import {NavController, Nav, Platform,NavParams} from 'ionic-angular';
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoginPage} from '../login/login';


@Component({
  templateUrl: 'build/pages/search/search.html',
   pipes: [TranslatePipe]
})
export class SearchPage {
 public items:any;
  constructor(private navCtrl: NavController, private translate: TranslateService, private platform: Platform,private navparams:NavParams) {

    this.items=["Resultat1","Resultat2","Resultat3"];
  }
itemSelected(item){
  
}
}
