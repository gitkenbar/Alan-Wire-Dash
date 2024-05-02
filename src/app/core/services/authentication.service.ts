import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${environment.apiUrl}/login/`, {user:{email, password}})
  }
  // setToken(current_user:any){
  //   localStorage.setItem('current_user', current_user);
  // }
  // getToken(){
  //   return localStorage.getItem('token');
  // }
  // isLoggedIn(){
  //   return !!this.getToken();
  // }
  // logout() {
  //   const headers = {'Authorization': `Bearer ${this.getToken()}`};
  //   return this.http.post(`${environment.apiUrl}/logout`, {headers})
  // }
  signup(email:string, password:string, username:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/signup/`, {user:{email,password,username}})
  }
}
