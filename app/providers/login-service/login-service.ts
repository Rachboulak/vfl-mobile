import { Injectable } from '@angular/core';
import {Platform, Alert, SqlStorage, Storage, LocalStorage} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import {DatabaseService} from '../database-service/database-service';
import {LoginPage} from '../../pages/login/login';

import {MenuPage} from '../../pages/menu/menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


export class LoginService extends DatabaseService {

    HAS_LOGGED_IN = 'hasLoggedIn';
    localStorage = new Storage(LocalStorage);

    public dologin(user, isSuccess, isError) {
        this.executeQuery("Select * from users where username=? and password=?",
            [user.username, user.password],
            (data) => {
                isSuccess(data);

                this.localStorage.set(this.HAS_LOGGED_IN, true);
                this.setUsername(user.username);
                this.events.publish('user:login');
                
            }, (error) => {
                isError(error);
            });
    }
    getUser(isSuccess, isError){
        this.localStorage.get('username').then((username)=>{
            this.executeQuery("Select * from users where username=?",[username],
            (data) => {
                isSuccess(data);
                
            }, (error) => {
                isError(error);
            });

        })
    }
   
    logout() {
        this.localStorage.remove(this.HAS_LOGGED_IN);
        this.localStorage.remove('username');
        this.events.publish('user:logout');
        this.storage.clear();
    }

    setUsername(username) {
        this.localStorage.set('username', username);
    }

    getUsername() {
        return this.localStorage.get('username').then((value) => {
            return value;
        });
    }

    // return a promise
    hasLoggedIn() {
        return this.localStorage.get(this.HAS_LOGGED_IN).then((value) => {
            return value;
        });
    }
}

