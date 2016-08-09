import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  public user;
  constructor(private nav: NavController,private navparams:NavParams) {
    
    this.user=this.navparams.get("user");
    console.log(this.user);
  }

}
