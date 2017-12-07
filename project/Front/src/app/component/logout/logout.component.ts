import { Component} from "@angular/core";
import {AuthConfigConsts} from "angular2-jwt";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls:['./logout.component.css']
})

export class logoutComponent {
  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem('token');
    location.href = "/";
  }
}
