import {Component} from '@angular/core';
import {enableProdMode} from '@angular/core';
import {Platform, ionicBootstrap, Storage, SqlStorage} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SERVER_DEV,LOGIN_DEV} from './providers/config';
import {StatusBar,Keyboard} from 'ionic-native';
import {Headers} from '@angular/http';
enableProdMode();
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'

})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {

    // this.rootPage = LoginPage;
    // this.rootPage = TabsPage;
    platform.ready().then(() => {
      let storage = new Storage(SqlStorage);
      storage.get('token').then((token) => {
        window['cc']={};
        if (LOGIN_DEV) {
          console.log("Login Dev Mode");
          window['cc'].token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDcxMTEwODEyfQ.cVs-bqvTpr47Ts2pF5RDT5n8E6snUE7_nOF9OnRE8ww';
          window['cc'].headers = new Headers({'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDcxMTEwODEyfQ.cVs-bqvTpr47Ts2pF5RDT5n8E6snUE7_nOF9OnRE8ww'});
        }else{
          window['cc'].headers = new Headers({'Authorization': token});
          window['cc'].token = token;
        }
        if(token){
          this.rootPage = TabsPage;
        }else{
          if(LOGIN_DEV){
            this.rootPage = TabsPage;
          }else{
            this.rootPage = LoginPage;
          }
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      Keyboard.disableScroll(true);
    });
  }
}

ionicBootstrap(MyApp);
