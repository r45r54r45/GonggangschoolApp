import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import {LoginRegisterPage} from '../login-register/login-register';
import {Page, Platform, Storage, SqlStorage} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {CordovaOauth, Facebook, Google} from 'ng2-cordova-oauth/core';
import {Class} from '../../providers/class/class';
import {TabsPage} from '../tabs/tabs';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Class]
})
export class LoginPage {
  private userData:any;
  private cordovaOauth: CordovaOauth;
  constructor(private navCtrl: NavController,private platform: Platform, private classService:Class,private app:App) {

  }
  goToRegister(data){
    this.navCtrl.push(LoginRegisterPage,{data:data});
  }
  goToMenu(){
    this.app.getRootNav().setRoot(TabsPage);
  }
  public facebookLogin() {
    this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "214340015575657", appScope: ["email"]}));
    this.platform.ready().then(() => {
      this.cordovaOauth.login().then(success => {
        // console.log("RESULT: " + JSON.stringify(success));
        this.userData=success;
        this.classService.loginUser("facebook",this.userData.access_token).subscribe(data=>{
          console.log(data.json());
          let receivedData=data.json();
          let formData= {
            email: receivedData.email,
            name: receivedData.name,
            profile: receivedData.picture.data.url
          };
          this.classService.verifyUser(formData).subscribe(data=>{
            if(data.json().isNew){
              this.goToRegister(formData);
            }else{
              let storage = new Storage(SqlStorage);
              storage.set('token', data.json().token);
              this.goToMenu();
            }
          });
        });
      }, error => {
        console.log("ERROR: ", error);
      });
    });
  }
  public googleLogin() {
    this.cordovaOauth = new CordovaOauth(new Google({clientId: "77101706358-h7oku8la3nffvh4tttg55gdjt77kl0v7.apps.googleusercontent.com", appScope: ["email"]}));
    this.platform.ready().then(() => {
      this.cordovaOauth.login().then(success => {
        console.log("RESULT: " + JSON.stringify(success));
        this.userData=success;
        this.classService.loginUser("google",this.userData.access_token).subscribe(data=>{
          let receivedData=data.json();
          let formData= {
            email: receivedData.emails[0].value,
            name: receivedData.name.familyName + receivedData.name.givenName,
            profile: receivedData.image.url
          }
          console.log(formData);
          this.classService.verifyUser(formData).subscribe(data=>{
            if(data.json().isNew){
              this.goToRegister(formData);
            }else{
              this.goToMenu();
            }
          });
        });
      }, error => {
        console.log("ERROR: ", error);
      });
    });
  }
}


