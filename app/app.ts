import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
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
  rootPage: any = LoginPage;

  constructor(platform: Platform, private translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
<<<<<<< HEAD
      //Sqlite initialisation
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)", {}).then((data) => {
          console.error("TABLE CREATED");
          db.executeSql("INSERT INTO users (username, password) VALUES ('admin', '123')", []).then((data) => {
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
      //i18n
=======
      //i18n      
>>>>>>> 28c43e8adda62e0772eef41ce6637a814b3a15ab
      this.translateConfig();
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
