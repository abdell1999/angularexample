import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private url = "http://127.0.0.1:8000/api/employees";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }



 constructor(private httpClient: HttpClient) { }


 getAll(): Observable<Employee[]> {
  return this.httpClient.get<Employee[]>(this.url)
  .pipe(
    catchError(this.errorHandler)
  )
}

create(employee:any): Observable<Employee> {
  return this.httpClient.post<Employee>(this.url, JSON.stringify(employee), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id:number): Observable<Employee> {
  return this.httpClient.get<Employee>(this.url + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id:number, employee:any): Observable<Employee> {
  return this.httpClient.put<Employee>(this.url + id, JSON.stringify(employee), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:number){
  return this.httpClient.delete<Employee>(this.url +"/"+ id, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

errorHandler(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}
