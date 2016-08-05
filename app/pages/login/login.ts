import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {MenuPage} from '../menu/menu';
import {User} from '../../model/user';
import {LoginService} from '../../providers/login-service/login-service';
import {TranslatePipe,TranslateService,Parser} from "ng2-translate/ng2-translate";

@Component({
  templateUrl: 'build/pages/login/login.html',
  pipes: [TranslatePipe],
})
export class LoginPage {

  private username: string;
  private password: string;

  constructor(private nav: NavController , private loginservice:LoginService,private translate: TranslateService) {

  }

  doLogin(){
      var user=new User(this.username,this.password);
      console.log(user);
      this.loginservice.dologin(user,this.nav);
     // this.nav.push(HomePage,{user: user});
     
  }

}
