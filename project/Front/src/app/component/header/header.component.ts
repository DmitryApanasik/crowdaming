import {Component, OnInit, ViewChild} from '@angular/core';
import { AppComponent} from '../app.component';
import {AuthGuard} from '../../service/guards/auth.guards';
import {User} from "../../model/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HeaderService} from "../../service/HeaderService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  mode: Boolean = false;
  currentMode:string;
  searcheRequest:string;
  curentUser: User = new User;
  constructor(public appComponent: AppComponent,
              protected authGuard: AuthGuard,
              private headerService:HeaderService) {}
  switchLanguage(language: string) {
    localStorage.setItem("language",language);
    this.appComponent.changeLanguage(language);
  }
  ngOnInit(){
    this.currentMode = localStorage.getItem("mode");
    if(this.currentMode == 'night') {
      this.setDarkMode();
      this.mode = true;
    } else {
      this.setLightMode();
    }
  }
  setDarkMode(){
    document.getElementById("bootswatch")
      .setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css");
  }
  setLightMode(){
    document.getElementById("bootswatch")
    .setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css");
  }
  changeMode() {
    if(this.mode) {
      this.setDarkMode();
      localStorage.setItem("mode", "night");
    } else {
      this.setLightMode();
      localStorage.setItem("mode", "day");
    }
  }
  sendRequest(){
    location.href = '/searcheResults/searche'+this.searcheRequest;
  }
}
