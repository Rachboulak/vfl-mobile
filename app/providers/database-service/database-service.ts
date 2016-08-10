import { Injectable } from '@angular/core';
import {Platform, Alert,SqlStorage, Storage,Events} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DatabaseService  {

protected storage: Storage;
  protected database:SQLite;
  protected devMode;

   public constructor(protected http: Http, protected platform: Platform,protected events:Events ) {
    //initialisation database
    if(platform.is('core')){
        //local storage
        this.useLocalStorage();
      }
      else{//sqlite
         this.useSqlite();
      }
  }

 
  useLocalStorage(){
    this.storage = new Storage(SqlStorage);
    this.devMode=true;
  }
  useSqlite(){
    this.devMode=false;
    this.database = new SQLite();
    this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
      console.log("CONNECTED!")
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }
  executeQuery(query,params,isSuccess,isError){
    if(this.devMode){
      this.storage.query(query,params).then((data) => {
            isSuccess(data.res);
        }, (error) => {
           isError(error);
        });
    }
    else{
  this.database.executeSql(query, params).then((data) => {
      isSuccess(data);

    }, (error) => {
      isError(error);
    });
    }
  }
    executePromiseQuery(query,params){
    if(this.devMode){
     return this.storage.query(query,params);
    }
    else{
  return this.database.executeSql(query, params);
    }
  }
}
