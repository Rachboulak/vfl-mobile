import {Component} from '@angular/core';
import {Platform, ionicBootstrap,SqlStorage, Storage,Events} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {HomePage} from './pages/home/home';

import {provide} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {LoginPage} from './pages/login/login';
import {LoginService} from './providers/login-service/login-service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [LoginService, TranslateService],
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
      }else{
         this.useSqlite();
      }    
      //i18n
      this.translateConfig();
    });
    
  }
useSqlite(){
  this.database = new SQLite();
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.database.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,lastname TEXT, firstname TEXT)", {}).then((data) => {
          console.error("TABLE CREATED");
          this.database.executeSql("INSERT INTO users (username, password,lastname,firstname) VALUES (?, ?,?,?)", ["admin", "123","Global","Admin"]).then((data) => {
            console.error("INSERTED: " + JSON.stringify(data));
          }, (error) => {
            console.error("ERROR: " + JSON.stringify(error.err));
          });
        }, (error) => {
          console.error("Unable to execute sql", error);
        })
      }, (error) => {
        console.error("Unable to open database", error);
      });
}
useLocalStorage(){
this.storage = new Storage(SqlStorage);
      this.storage.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,lastname TEXT, firstname TEXT)");
       this.storage.query("INSERT INTO users (username, password,lastname,firstname) VALUES (?, ?,?,?)", ["admin", "123","Global","Admin"]).then((data) => {           
        }, (error) => {
            console.log(error);
        }); 
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
