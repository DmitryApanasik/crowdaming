import { Component} from "@angular/core";
import {AuthGuard} from "../../service/guards/auth.guards";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class profileComponent {
  constructor( protected authGuard: AuthGuard){}
}
