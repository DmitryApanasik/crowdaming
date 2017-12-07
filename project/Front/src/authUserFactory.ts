import {Http, RequestOptions} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

export function authHttpUserFactory(http: Http, options: RequestOptions) {
  console.log('auth.factory');
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    // tokenGetter: (() => JSON.parse(localStorage.getItem('currentUser')).token.split(' ')[1]),
    // headerPrefix: 'Bearer',
    globalHeaders: [{'Content-Type': 'application/json'}],
    headerName: 'Authorization',
    noJwtError: true
  }), http, options);
}
