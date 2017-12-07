import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {delay} from 'rxjs/operator/delay';

declare var $: any;
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    $('#login-button-header').click();
    return false;
  }

  isActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
