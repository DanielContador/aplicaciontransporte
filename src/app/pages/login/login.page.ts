import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { APIClientService } from 'src/app/services/apiclient.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users:any;
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  
  user={
    usuario:"",
    password:""
  }

  //variable para guardar nombre del campo faltante
  field:string="";
  compareWith:any;
 
  constructor(private router: Router, public toastController: ToastController, private api:APIClientService, public navCtrl:NavController, public alertController:AlertController ) {



  }
    // Se debe instanciar

  ionViewWillEnter(){
    this.getUsers();
    localStorage.setItem('ingresado','false');

    
  }
  ngOnInit() {
    localStorage.setItem('ingresado','false');
  }

  getUsers(){
    this.api.getUsers().subscribe((data)=>{
      this.users=data;
      console.log(this.users.alumnos[1].username)

    });
  }



  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  async ingresar(){
    let bandera=false;
console.log('ingresar')
    //var usuario = JSON.parse(localStorage.getItem('usuario'));
    for(let i = 0; i < this.users.alumnos.length; i++){
      if(this.user.usuario.trim() === this.users.alumnos[i].username.trim() && this.user.password.trim() === this.users.alumnos[i].password.trim()){
          console.log(this.user.usuario)
          console.log(this.users.alumnos[i].username.trim())
          console.log('coincide')
          this.presentToast("Bienvenido " + this.user.usuario)
          bandera = true;
          localStorage.setItem('ingresado','true');
          localStorage.setItem('user',this.user.usuario);

          this.router.navigate(['/home']); // navegamos hacia el Home y enviamos información adicional
      }
      else{
}



      /*
    if(this.users.username == f.username && this.users.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('inicio');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }*/
  }
  if(!bandera){
    console.log('no coincide')
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Los datos que ingresaste son incorrectos.',
      buttons: ['Aceptar']
  })
  await alert.present();
  }

  /*
  ingresar(){
    if(this.validateModel(this.user)){
      this.presentToast("Bienvenido " + this.user.usuario)
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['/home'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
    } else{

      this.presentToast("falta ingresar "+ this.field, 3500)
    }


*/
    }

  
  recuperar(){
    this.router.navigate(['/recuperar']);

  }

    // Se declara e instancia un elemento de tipo NavigationExtras



  /**
   *ValidateModel sirve para validar que se ingrese algo en lo campos del html
   mediante su modelo **/
   validateModel(model:any){

    //Recorro todas las entradas que me entrega Object entries y obtengo la clave-valor
    for(var[key, value] of Object.entries(model)){
      //si el value está vacio retorno un falso y guardo el campo para el error
      if (value==""){
        this.field=key;
        return false;
      }
    }
    return true;
   }
//presentToast es asincrono, por lo que se muestra sobre otras paginas, ya que se sigue ejecutando
   async presentToast(msg:string, duracion?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion?duracion:2000
    });
    toast.present();
  }


}
