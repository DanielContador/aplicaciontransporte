import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
correo:string="";
  constructor(private router:Router, private alertController: AlertController) { }

  ngOnInit() {
  }



  login(){

    this.router.navigate(['/login']);

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha enviado un correo a: ' + this.correo,
      buttons: ['OK'],
    });

    await alert.present();
  }




}
