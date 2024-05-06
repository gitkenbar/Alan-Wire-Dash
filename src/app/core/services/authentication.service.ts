import { HttpClient, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login/`, {user:{email, password}},
      { observe: 'response'}
    )
  }

  setToken(token:any){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  // not sure we'll need this, delete at end of project
  isLoggedIn(){
    return !!this.getToken()
  }

  logout() {
    const headers = {'authorization': `${this.getToken()}`};
    return this.http.delete<{token:string}>(`${environment.apiUrl}/logout`, {headers: headers})
  }

  signup(email:string, password:string, username:string){
    return this.http.post(`${environment.apiUrl}/signup/`, {user:{email,password,username}})
  }

  getLoggedInUser() {
    const headers = {'authorization': `${this.getToken()}`};
    return this.http.get(`${environment.apiUrl}/current_user`, {headers: headers})
  }

  // https://www.youtube.com/watch?v=o-mRH-GFK0M&pp=ygUTaHR0cGhlYWRlcnMgYW5ndWxhcg%3D%3D
}
// https://www.youtube.com/watch?v=spEviYIaYAI
// https://www.youtube.com/watch?v=KO0Yid7FfBA
// import { Http, Headers, Response } from '@angular/http';




