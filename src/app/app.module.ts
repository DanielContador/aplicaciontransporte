import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentModule } from './components/ComponentModule';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({

  declarations: [AppComponent],

  entryComponents: [],

  imports: [ComponentModule ,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, Geolocation],

  bootstrap: [AppComponent],

 })

 export class AppModule {}





