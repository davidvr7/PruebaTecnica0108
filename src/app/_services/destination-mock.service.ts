import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination } from '../_model/destination'; 
import { MOCK_DESTINATIONS } from '../_mocks/mock-destinations';
import { MOCK_MODULES } from '../_mocks/mock-modules';
import { Module } from '../_model/module.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationMockService {
 
  private destinations: Destination[] = MOCK_DESTINATIONS;
  private modules: Module[] = MOCK_MODULES;

  getAll(): Observable<Destination[]> {
    return of(this.destinations);
  }

  getModules(): Observable<Module[]> {
    return of(this.modules);
  }

  getById(id: number): Observable<Destination | undefined> {
    const destination = this.destinations.find(d => d.id === id);
    return of(destination);
  }

  deleteById(id: number | undefined): Observable<boolean> {
    const index = this.destinations.findIndex(d => d.id === id);
    if (index !== -1) {
      this.destinations.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  update(destination: Destination): Observable<boolean> {
    const index = this.destinations.findIndex(d => d.id === destination.id);
    if (index !== -1) {
      this.destinations[index] = destination;
      return of(true);
    }
    return of(false);
  }

  create(destination: Destination): Observable<boolean> {
    this.destinations.push(destination);
    return of(true);
  }

}