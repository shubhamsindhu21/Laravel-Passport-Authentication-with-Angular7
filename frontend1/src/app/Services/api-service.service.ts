import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  signup(data){
    return this.http.post(`${this.baseUrl}/Auth/register`, data)
  }

  login(data){
    return this.http.post(`${this.baseUrl}/Auth/login`, data)
  }

  sendResetPassword(data){
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
}
