import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  public user;
  constructor(private nav: NavController,private navparams:NavParams) {
    
    this.user=this.navparams.get("user");
  }

}
