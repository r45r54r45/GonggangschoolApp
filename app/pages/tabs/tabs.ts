import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {ChatPage} from '../chat/chat';
import {TeachPage} from '../teach/teach';
import {MyclassPage} from '../myclass/myclass';
import {MypagePage} from '../mypage/mypage';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = MyclassPage;
    this.tab3Root = TeachPage;
    this.tab4Root = ChatPage;
    this.tab5Root = MypagePage;
  }

}
