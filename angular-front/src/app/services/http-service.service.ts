import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

UrlBase: String = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  async getPromise(rota: any) {
    return await this.http.get(this.UrlBase + rota, this.httpOptions)
    .toPromise();
  }

  get(rota: any) {
    return this.http.get(this.UrlBase + rota, this.httpOptions);
  }

  post(rota: any, body?: any) {
    return this.http.post(this.UrlBase + rota, JSON.stringify(body), this.httpOptions)
  }

  async postPromisse(rota: any, body?: any) {
    return await this.http.post(this.UrlBase + rota, JSON.stringify(body), this.httpOptions)
      .toPromise();
  }

  put(rota: any, body?: any) {
    return this.http.put(this.UrlBase + rota, JSON.stringify(body), this.httpOptions)
  }


  async putPromisse(rota: any, body?: any) {
    return await this.http.put(this.UrlBase + rota, JSON.stringify(body), this.httpOptions)
    .toPromise();
  }

  async delete(rota: any) {
    console.log(this.UrlBase + rota);
    return await this.http.delete(this.UrlBase + rota, this.httpOptions).toPromise();
  }

  
}
