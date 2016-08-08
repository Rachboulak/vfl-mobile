import { Injectable } from '@angular/core';
import {Platform, Alert, SqlStorage, Storage} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import {DatabaseService} from '../database-service/database-service';
import {LoginPage} from '../../pages/login/login';
import {HomePage} from '../../pages/home/home';
import {MenuPage} from '../../pages/menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



export class LoginService extends DatabaseService {

    public dologin(user, isSuccess,isError) {
        this.executeQuery("Select * from users where username=? and password=?",
            [user.username, user.password],
            (data) => {
                isSuccess(data);
            }, (error) => {
                isError(error);
            });
    }


}

