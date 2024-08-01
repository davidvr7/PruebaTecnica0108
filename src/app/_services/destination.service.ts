import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destination } from '../_model/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
 
  private apiUrl = 'https://api.example.com/destinations';  

  constructor(private http: HttpClient) { }

  getAll(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  } 
  
  getById(id: number): Observable<Destination> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Destination>(url);
  }

  deleteById(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }

  update(destination: Destination): Observable<boolean> {
    const url = `${this.apiUrl}/${destination.id}`;
    return this.http.put<boolean>(url, destination);
  }

  create(destination: Destination): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, destination);
  }

}