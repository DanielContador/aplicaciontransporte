import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Viaje } from 'src/app/clases/viaje';
import { BtnAgregarService } from 'src/app/services/btn-agregar.service';
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.scss'],
})
export class PasajeroComponent implements OnInit {
  viajes: Viaje[];
  constructor(private servicebtn: BtnAgregarService,private dbservice: DbserviceService,  private servicioBD:DbserviceService, private  activeroute: ActivatedRoute, private router: Router, public alertController:AlertController, private animationCtrl: AnimationController) { }
  public buttonClicked: boolean = false;
  
  public onButtonClick() { this.buttonClicked = !this.buttonClicked; } 

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res)=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.viajes=item;
        })
      }
    })
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
    this.servicioBD.presentToast(valor);

  }
  editar(item) {
    let navigationExtras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.router.navigate(['/modificar'],navigationExtras);
  }

  eliminar(item) {
    this.servicioBD.deleteViaje(item.id);
    this.servicioBD.presentToast("Noticia Eliminada");
  }
  
  onSomeButtonClick() {
    this.servicebtn.listarViajes({
        foo: 'bar'
    });
}
}
