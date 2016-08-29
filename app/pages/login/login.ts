import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginRegisterPage} from '../login-register/login-register';
import {Page, Platform, Storage, SqlStorage} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {CordovaOauth, Facebook, Google} from 'ng2-cordova-oauth/core';
import {Class} from '../../providers/class/class';
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
  constructor(private navCtrl: NavController,private platform: Platform, private classService:Class) {

  }
  goToRegister(data){
    this.navCtrl.push(LoginRegisterPage,{data:data});
  }
  goToMenu(){

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
        this.classService.loginUser("google",this.userData.access_token).subscribe(data=>{
          let receivedData=data.json();
          let formData= {
            email: receivedData.emails[0].value,
            name: receivedData.name.familyName + receivedData.name.givenName,
            profile: receivedData.image.url
          }
          this.classService.verifyUser(formData).subscribe(data=>{
            if(data.json().isNew){
              this.goToRegister(data.json());
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
  public naverLogin() {
    return new Promise(function(resolve, reject) {
      // let browserRef = InAppBrowser.open('https://nid.naver.com/oauth2.0/authorize?client_id=OR8iPuPVB0sBsp4wG9wH&response_type=code&redirect_uri=http://localhost/callback&state=r45r54r45','_system');
      var browserRef = InAppBrowser.open("https://nid.naver.com/oauth2.0/authorize?client_id=OR8iPuPVB0sBsp4wG9wH&response_type=code&redirect_uri=http://localhost/callback&state=r45r54r45",'_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
       browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          browserRef.removeEventListener("exit", (event) => {});
          browserRef.close();
          var responseParameters = ((event.url).split("#")[1]).split("&");
          var parsedResponse = {};
          for (var i = 0; i < responseParameters.length; i++) {
            parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
          }
          if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem authenticating with Facebook");
          }
        }
      });
      browserRef.addEventListener("exit", function(event) {
        reject("The Facebook sign in flow was canceled");
      });
    });
  }
}


