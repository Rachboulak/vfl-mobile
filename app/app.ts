import {Component} from '@angular/core';
import {Platform, ionicBootstrap,SqlStorage, Storage,Events} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SQLConfig} from './model/sqlconfig';

import {provide} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {LoginPage} from './pages/login/login';
import {LoginService} from './providers/login-service/login-service';
import {ReportService} from './providers/report-service/report-service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [LoginService, TranslateService,ReportService],
  pipes: [TranslatePipe]
})
export class MyApp {

  rootPage: any=LoginPage ;

  private storage: Storage;
  private database:SQLite;

  constructor(private events: Events,platform: Platform, private translate: TranslateService,private loginservice:LoginService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
     
      //database initialisation
      if(platform.is('core')){
        this.useLocalStorage();
        console.log("***************USING SQLSTORAGE********************");
      }else{
         this.useSqlite();
         console.log("***************USING SQLite********************");
      }    
      //i18n
      this.translateConfig();
    });
    
  }
useSqlite(){
  this.database = new SQLite();
  var tables=SQLConfig.SQL_TABLES;
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        console.log("------------------Creating tables-------------------");
        for(let table of tables){
                    this.database.executeSql(table.create, {}).then((data) => {
                            console.log("Table "+table.name+" CREATED!");
                            for(let line of table.lines){

                              this.database.executeSql(line.script, line.params).then((data) => {
                                    console.log("INSERTED in: "+table.name+" " + JSON.stringify(data));
                                  }, (error) => {
                                    console.log("ERROR: "+table.name+" "+line.script+" \n" + JSON.stringify(error.err));
                                  });
                          }
                    }, (error) => {
                      console.error("Unable creating table:"+table.name, error);
                    });
              }
      }, (error) => {
        console.error("Unable to open database", error);
      });
}
useLocalStorage(){
this.storage = new Storage(SqlStorage);
var tables=SQLConfig.SQL_TABLES;

for(let table of tables){

      this.storage.query(table.create).then(

        (data) => {
          console.log("Table "+table.name+" CREATED!");
          for(let line of table.lines){
            this.storage.query(line.script, line.params).then((data) => { 
                        console.log("Line inserted!");
                    }, (error) => {
                        console.log("Error inserting line :"+JSON.stringify(error.err));
                    }); 
          }  
        }, (error) => {
                console.log("ERROR creating table "+table.name,JSON.stringify(error));
            });      
}
     
}
  translateConfig() {

    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en|fr)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }
}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
  deps: [Http]
}),
  TranslateService]], {
  });
