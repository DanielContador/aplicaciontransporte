import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }
 
  // Se establece la base url del API a consumir
  // apiURL = 'https://jsonplaceholder.typicode.com'; // Fuente Original funciona solo get
  apiURL = 'https://nancyb3a.github.io/Test/usuarios_PGY4121_01.json'; // Ejecuta json-server -H ip .\db.json para ejecutar un Fake APIRest
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );

}
}