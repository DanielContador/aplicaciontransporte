import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viaje } from '../clases/viaje';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  

  public database: SQLiteObject;
  tblViajes:string = "CREATE TABLE IF NOT EXISTS viaje(id INTEGER PRIMARY KEY autoincrement, Auto VARCHAR(50) NOT NULL, pasajeros TEXT NOT NULL, direccion VARCHAR(50) NOT NULL);";
  //registro:string = "INSERT or IGNORE INTO noticia(id, titulo,texto) VALUES (1,'Titulo de la noticia','texto de la noticia');";
  listaViajes = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, 
    private platform:Platform, 
    public toastController: ToastController) { 
      this.crearBD();
    }
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'viajes.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblViajes,[]);
      //await this.database.executeSql(this.registro,[]);
      
      this.cargarViajes();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  }
  cargarViajes() {
    return this.database.executeSql('SELECT * FROM viaje',[])
    .then(res=>{
      let items:Viaje[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            Auto:res.rows.item(i).Auto,
            pasajeros:res.rows.item(i).pasajeros,
            direccion:res.rows.item(i).direccion
          });          
        }
      }
      this.listaViajes.next(items);
    });
  }
  addViaje(Auto,pasajeros,direccion){
    let data=[Auto,pasajeros,direccion];
    return this.database.executeSql('INSERT INTO viaje(Auto,pasajeros,direccion) VALUES(?,?,?)',data)
    .then(()=>{
      this.cargarViajes();
    });
  }
  updateNoticia(id,Auto,pasajeros){
    let data=[Auto,pasajeros,id];
    return this.database.executeSql('UPDATE viaje SET Auto=?, pasajeros=? WHERE id=?',data)
    .then(()=>{
      this.cargarViajes();
    });
  }
  deleteViaje(id){
    return this.database.executeSql('DELETE FROM viaje WHERE id=?',[id])
    .then(()=>{
      this.cargarViajes();
    });
  }
  dbState(){
    return this.isDbReady.asObservable();
  }

  fetchViajes(): Observable<Viaje[]> {
    return this.listaViajes.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
