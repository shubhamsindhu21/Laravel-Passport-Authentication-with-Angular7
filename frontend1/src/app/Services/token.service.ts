import { Injectable } from '@angular/core';
// import {HttpHeaders} from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({

      'Authorization':'Basic' +  btoa('16554201:abc0d89b46a9f7675db43644ebbbe925')

  }
    )};
  call() {
    return this.http
      .get('https://acuityscheduling.com/api/v1/availability/dates?appointmentTypeID=8347636&month=2018-11&calendarID=2497857&timezone=Europe/London', this.httpOptions)
  }

  handle(token){
    this.set(token);
    console.log(true);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid(){
    const token=this.get();
    if(token){
      console.log(true);
      return true;
    }
  }

  loggedIn() {
    return this.isValid();
  }
}
