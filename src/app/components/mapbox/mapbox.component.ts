import { Component } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Geolocation,Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'mapbox-component',
  templateUrl: 'mapbox.component.html',
  styleUrls: ['mapbox.component.scss']
})

export class MapboxComponent {

  public mapa: Mapboxgl.Map;
  latitude: any;
  longitude: any;
  geoposicion: any;
  latitud: any;
  longitud: any;
  
  constructor(private geolocation: Geolocation) {

  }
  ionViewDidEnter() {
    
  }
  ngOnInit() {
    this.getCurrentCoordinates();
  }

  ngAfterViewInit(){
    this.geolocationNative();
  }

  geolocationNative(){
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) =>{
      this.latitud = geposition.coords.latitude;
      this.longitud = geposition.coords.longitude;
      var URL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + this.latitud + '&lon=' + this.longitud

      fetch(URL, {
          method: "GET",
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => {
          this.geoposicion = json.display_name.substring(0, 33)
        }
        )
        .catch(err => console.log(err));
      });
  }



  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      Mapboxgl.accessToken = environment.mapboxKey;
      this.mapa = new Mapboxgl.Map({
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.longitude, this.latitude],
        zoom: 18,
        maxZoom: 18,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
        });
        this.mapa.addControl(new Mapboxgl.NavigationControl());
        this.mapa.on('load', () => {
          this.mapa.addSource('places', {
          // This GeoJSON contains features that include an "icon"
          // property. The value of the "icon" property corresponds
          // to an image in the Mapbox Streets style's sprite.
          'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': [
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Mi ubicación</strong><p><a href="https://www.duoc.cl/" target="_blank" title="Opens in a new window">DuocUc</a> Tellevoapp!</p>',
          'iconSize': [200, 200],
          'icon': 'car-15'

          },
          'geometry': {
          'type': 'Point',
          'coordinates': [this.longitude, this.latitude]
          }
          }
        ]
          }
          
          }
          );
          // Add a layer showing the places.
          this.mapa.addLayer({
          'id': 'places',
          'type': 'symbol',
          'source': 'places',
          'layout': {
          'icon-image': '{icon}',
          'icon-allow-overlap': true
          }
          });
           
          // When a click event occurs on a feature in the places layer, open a popup at the
          // location of the feature, with description HTML from its properties.
          this.mapa.on('click', 'places', (e) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
           
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
           
          new Mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.mapa);
          });
           
          // Change the cursor to a pointer when the mouse is over the places layer.
          this.mapa.on('mouseenter', 'places', () => {
          this.mapa.getCanvas().style.cursor = 'pointer';
          });
           
          // Change it back to a pointer when it leaves.
          this.mapa.on('mouseleave', 'places', () => {
          this.mapa.getCanvas().style.cursor = '';
          });
          });
          
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  /*buildmap(){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.53306812434553,-33.03378819713586], // starting position
      zoom: 15 // starting zoom
    });
    this.mapa.addControl(new Mapboxgl.NavigationControl());
  }*/
}
