/** Importaciones de librerias a usar */

import { Component,ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Viaje } from 'src/app/clases/viaje';
import { ConductorComponent } from 'src/app/components/conductor/conductor.component';
import { BtnAgregarService } from 'src/app/services/btn-agregar.service';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage  {
  viajes: Viaje[];
  
  option={
    slidesPerview:1.5,
    centeredSlides:true,
    loop:true,
    spaceBetween:2,
  }
  
  user: any; // Generamos una variable Any (permite cualquier valor)
  data:any={

  }
  Auto= "";
  pasajeros= "";
  direccion= "";

    @ViewChild('animacion1',{read: ElementRef, static:true}) animacion1: ElementRef;
    @ViewChild('animacion2',{read: ElementRef, static:true}) animacion2: ElementRef;
    @ViewChild('squareA',{read: ElementRef, static:true}) squareA: ElementRef;
  constructor(private btnservice : BtnAgregarService , private dbservice: DbserviceService,  private servicioBD:DbserviceService, private router: Router, public alertController:AlertController, private animationCtrl: AnimationController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
   
    this.initializeApp();
    this.user=localStorage.getItem('user')
  }
  ngAfterViewInit(){
    const squareA=this.animationCtrl.create()
    
    .addElement(this.squareA.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(0.2) rotate(0)' },
      { offset: 0.5, transform: 'scale(0.2) rotate(360deg)' },
      { offset: 1, transform: 'scale(0.4) rotate(360deg)' },
   
    ]);
    const anima1=this.animationCtrl.create()
    .addElement(this.animacion1.nativeElement)
    .addElement(this.squareA.nativeElement)
    .duration(5000)
    .iterations(Infinity)
    .keyframes([
      //{offset:0, background:'red'},
      {offset:0.78, background:'var(--background)'},
      //{offset:1, background:'green'},
    ]);

    const anima2=this.animationCtrl.create()
    .addElement(this.animacion2.nativeElement)
    .duration(5000)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(500px)')
    .fromTo('opacity', '1', '0.4');

    const animacion=this.animationCtrl.create()
    .duration(3000)
    .iterations(Infinity)
    .addAnimation([anima1,squareA,anima2])

    animacion.play();

  }
  segmentChanged($event){    
    let direccion=$event.detail.value;
    console.log(direccion);
    this.router.navigate(['home/'+direccion]);
  }


  public buttonClicked: boolean = false;

  public mapClick: boolean = false;

  public listarViaje: boolean = false;


  
  public onButtonClick() { this.buttonClicked = !this.buttonClicked;
  this.mapClick= false;
this.listarViaje=false; } 


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
    this.servicioBD.presentToast("Viaje Eliminado");
  }

  salir(){
    localStorage.setItem('ingresado','false');
    this.router.navigate(['/login']);
  };
  

  initializeApp() {
    

    this.btnservice.getObservable().subscribe(() => {
        console.log('Data received');
        this.mapClick = !this.mapClick; 
    });


    this.btnservice.getObservablePasajero().subscribe(() => {
      console.log('Data received');
      this.listarViaje = !this.listarViaje; 
  });
}




guardar() {
this.dbservice.addViaje(this.Auto,this.pasajeros,this.direccion);
this.dbservice.presentToast("Viajes Agregado");
this.router.navigate(['home']);
}


unirse(){
  this.servicioBD.presentToast("Se ha unido al viaje");

}


}
