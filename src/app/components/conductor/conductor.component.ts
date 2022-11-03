import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/clases/viaje';
import { HomePage } from 'src/app/pages/home/home.page';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import { BtnAgregarService } from 'src/app/services/btn-agregar.service';


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss'],
})


export class ConductorComponent implements OnInit {
  Auto= "";
  pasajeros= "";
  direccion= "";
  viajes: Viaje[];
  constructor(private servicebtn: BtnAgregarService , private dbservice: DbserviceService,  private servicioBD:DbserviceService, private router: Router) { }


  
  //public onButtonClick() { this.buttonClicked = !this.buttonClicked; } 

  ngOnInit() {

    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }
  guardar() {
    this.dbservice.addViaje(this.Auto,this.pasajeros,this.direccion);
    this.dbservice.presentToast("Viajes Agregado");
    this.router.navigate(['home']);
  }

  onSomeButtonClick() {
    this.servicebtn.publishSomeData({
        foo: 'bar'
    });
}

}


