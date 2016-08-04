import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslatePipe} from "ng2-translate/ng2-translate";
 
@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  constructor(private navCtrl: NavController) {


  }
}
