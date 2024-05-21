import { HttpClient, HttpHeaders , HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Profile } from '../../shared/models/profile'


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
  adminGetProfiles() {
    return this.http.get<Profile[]>(`${environment.apiUrl}/profiles`)
  }
  adminGetProfile(name:string){
    return this.http.get<Profile>(`${environment.apiUrl}/profiles/name/${name}`)
  }
  createProfile(employee_number: number, first_name: string, last_name: string, user_id:number, is_admin: boolean) {
    return this.http.post(`${environment.apiUrl}/profiles/`, {profile: { employee_number, first_name, last_name, user_id, is_admin }})
  }
}






