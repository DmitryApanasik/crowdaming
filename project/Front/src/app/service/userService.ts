import { Injectable} from '@angular/core';
import {CoreService} from './coreService';
import {User} from '../model/user';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {AuthenticationService} from './AuthentificationService';
import {Observable} from 'rxjs/Observable';
import {AuthConfigConsts, AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {MessageRequestDto} from "../model/MessageRequestDto";



@Injectable()
export class UserService extends CoreService {
  private user: User = new User();
  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private authentificationService: AuthenticationService) {
    super();
  }
  register(user: User){
    user.image = "http://res.cloudinary.com/crowbanding/image/upload/v1505169795/sy6afdedllqhpbh8zebq.jpg";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    console.log("registration");
    return this.http.post(`${this.webService}registration`,user,{headers}).map((response:Response) => response).
    do(data => {
      location.href='/';
    });
  }
  blocking(data: number[]){
    console.log(JSON.stringify(data));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.post(`${this.webService}block`,JSON.stringify(data),{headers})
      .map((response: Response) => response);
  }
  confirm(data: number[]){
    console.log(JSON.stringify(data));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.post(`${this.webService}confirmButton`,JSON.stringify(data),{headers})
      .map((response: Response) => response).do(data => {
        location.href="/profile";
      });
  }
  deleting(data: number[]){
    console.log(JSON.stringify(data));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.post(`${this.webService}delete`,JSON.stringify(data),{headers})
      .map((response: Response) => response);
  }
  sendConfirm(image: string, additionally: string){
    let message = new MessageRequestDto();
    message.image = image;
    message.text = additionally;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.http.post(`${this.webService}confirmProfile`, JSON.stringify(message), {headers}).
      map((response:Response) => response);
  }
  updateProfile(user: User) {
    var data : any ;
    data = localStorage.getItem("image");
    localStorage.removeItem("image");
    this.user = user;
    this.user.image = data;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.post(`${this.webService}update-user`, this.user,{headers})
      .map((response: Response) => response).do(data => {
        location.href="/profile";
      });
  }
  getAll(){
    return this.authHttp.get(`${this.webService}getUsers`).map(res =>res.json());
  }
  getMessage(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME));
    return this.authHttp.get(`${this.webService}getMessage`,{headers}).map(res =>res.json());
  }

}
