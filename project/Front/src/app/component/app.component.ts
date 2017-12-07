import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OverlayContainer} from "@angular/cdk/typings/overlay";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private translate: TranslateService) {
    if(!localStorage.getItem("language"))
    localStorage.setItem("language", "ru");
  }
  ngOnInit(){
    this.translate.use(localStorage.getItem("language"));
  }
    changeLanguage(language: string) {
    this.translate.use(language);
  }
}
