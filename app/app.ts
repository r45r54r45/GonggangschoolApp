import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {DEV} from './providers/config';

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
        if(token){
          this.rootPage = TabsPage;
        }else{
          if(DEV){
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
    });
  }
}

ionicBootstrap(MyApp);
