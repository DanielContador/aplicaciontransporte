import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  Auto= "";
  pasajeros= "";
  direccion= "";
  constructor(private dbservice: DbserviceService, private router: Router) { }

  guardar() {
    this.dbservice.addViaje(this.Auto,this.pasajeros,this.direccion);
    this.dbservice.presentToast("Viajes Agregado");
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
