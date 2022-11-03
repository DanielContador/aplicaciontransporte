import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BtnAgregarService {

  constructor() { }

  private fooSubject = new Subject<any>();

  private pasajero = new Subject<any>();

  publishSomeData(data: any) {
      this.fooSubject.next(data);
  }

  listarViajes(data: any) {
    this.pasajero.next(data);
}

  getObservable(): Subject<any> {
      return this.fooSubject;
  }

  getObservablePasajero(): Subject<any> {
    return this.pasajero;
}
}


