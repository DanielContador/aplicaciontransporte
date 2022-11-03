import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ConductorComponent } from 'src/app/components/conductor/conductor.component';
import { PasajeroComponent } from 'src/app/components/pasajero/pasajero.component';
import { ComponentModule } from 'src/app/components/ComponentModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    ComponentModule
  ],
  declarations: [HomePage, ConductorComponent, PasajeroComponent]
})
export class HomePageModule {}
