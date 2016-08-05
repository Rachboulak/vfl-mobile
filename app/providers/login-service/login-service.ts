import { Injectable } from '@angular/core';
import {Platform, Alert} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import {LoginPage} from '../../pages/login/login';
import {HomePage} from '../../pages/home/home';
import {MenuPage} from '../../pages/menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {
  public database: SQLite;

  constructor(private http: Http, private platform: Platform) {
    //initialisation database
    this.database = new SQLite();
    this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
      console.log("CONNECTED!")
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  public dologin(user, nav) {
    this.database.executeSql("Select * from users where username=? and password=?", [user.username, user.password]).then((data) => {
      if (data.rows.length > 0) {
        nav.push(HomePage,{user: user});
      }
      else {
        this.doAlert(nav, "Login failed", "Wrong username or Password");
      }

    }, (error) => {
      this.doAlert(nav, "Error", "Can't connect to database");
    });

  }

  doAlert(nav, title, message) {
    let alert = Alert.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    nav.present(alert);
  }
}

