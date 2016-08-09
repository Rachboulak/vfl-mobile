import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import {HomePage} from '../home/home';
import {MenuPage} from '../menu/menu';
import {User} from '../../model/user';
import {LoginService} from '../../providers/login-service/login-service';
import {TranslatePipe, TranslateService, Parser} from "ng2-translate/ng2-translate";

@Component({
    templateUrl: 'build/pages/login/login.html',
    pipes: [TranslatePipe],
})
export class LoginPage {

    submitted = false;
    login: { username?: string, password?: string } = {};

    constructor(private nav: NavController, private loginservice: LoginService, private translate: TranslateService) {

    }

    onLogin(form) {
        this.submitted = true;
        var user = new User(this.login.username, this.login.password);
        if (form.valid) {
            this.loginservice.dologin(user, (data) => {
                if (data.rows.length > 0) {
                    this.nav.push(HomePage, { user: user });
                }
                else {
                    this.doAlert(this.nav, "Login failed", "Wrong username or Password");
                }
            }, (error) => {
                console.log(error);
                this.doAlert(this.nav, "Error", "Can't connect to database");
            });
        }



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
