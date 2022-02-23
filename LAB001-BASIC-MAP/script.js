// Step 3| Initialize the map

// #1 Setup Singapore latlng 
let singapore = [ 1.29,103.85]; 

// #2 Set the center point for the map to focus on
let map = L.map('map').setView(singapore, 13); 
// setup the tile layers
let apiKey = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

// Load in the apiKey
// L.tileLayer expects 2 parameters; 1.api key, 2. an object
//      within the object {
//          there are a few keys Leaflet created
//      }
L.tileLayer( apiKey , {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map); // Lastly .addTo(map) renders the code to the map

// See if you could display the map when you assess your HTML

// Go to Lab 2