//Inyectamos HTTPClient y ofrecemos una API más sencillas basada en observables a los demás servicios.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000';
  public jwtToken = 'tuTokenJWT';

  constructor(private http: HttpClient) {}

  postLogin(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, user);
  }

  getCasas(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    });
    
    return this.http.get(`${this.apiUrl}/houses`, { headers });
  }



  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/ruta-endpoint`, data, { headers });
  }
}
