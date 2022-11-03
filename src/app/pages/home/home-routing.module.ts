import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConductorComponent } from 'src/app/components/conductor/conductor.component';
import { MapboxComponent } from 'src/app/components/mapbox/mapbox.component';
import { PasajeroComponent } from 'src/app/components/pasajero/pasajero.component';
import { HomePage } from './home.page';

/**
 * Se genera las rutas mediante una constante de tipo Route
 * como un arreglo que acepta rutas, en este caso se implementa
 * un enrutamiento simple, donde existe un path raiz y se carga
 * el componente Home
 */
const routes: Routes = [
  {
    path: '', //path
    component: HomePage, // Componente

    children:[
      {
        path:'pasajero',
        component:PasajeroComponent
      },
      {
        path:'conductor',
        component:ConductorComponent
      },
      {
        path:'mapbox',
        component:MapboxComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Al route module le asignamos como hijo las rutas de indicamos arriba
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
