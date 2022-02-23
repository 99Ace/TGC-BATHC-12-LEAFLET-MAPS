let singapore = [ 1.29,103.85]; 

let map = L.map('map').setView(singapore, 13); 

let apiKey = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

L.tileLayer( apiKey , {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// #1 Create a marker
// set up the marker in a L.marker([Lat, Lng]) format
let singaporeMarker = L.marker([1.29, 103.85]);

// #2 Place the marker on the map
singaporeMarker.addTo(map);

// check your map

// #3 Show a popup on click
// .bindPopup( string content ) <-- html elements
singaporeMarker.bindPopup("<h4>Singapore</h4>");

// #4 Add an event listener
// add the .addEventListener() to the marker variable
singaporeMarker.addEventListener("click", function(){
    alert("Singapore")
});

// #5 Add a Circle
// Setup a circle variable to hold the circle settings 
// L.circle ( array , object )
// array passes info on LatLng
// object passes the various settings in keys [read documentation]
let circle = L.circle([1.29, 103.84], {
    // set the border colors
    color: 'red',
    // set the background color
    fillColor:"orange",
    // set the background opacity
    fillOpacity:0.5,
    // set the radius of the circle
    radius: 500
});

// Render the circle to the map
circle.addTo(map);

// #6 Get Own Location 
navigator.geolocation.getCurrentPosition(position => {
    // Leaflet passes the latlng in
    const { coords: { latitude, longitude } } = position;
    var marker = new L.marker([latitude, longitude], {
      draggable: true,
      autoPan: true
    }).addTo(map);
})







// Try to add the markers for the following locations
// 1. Singapore Zoo
// 2. Changi Airport
// 3. Sentosa

// Try add a popup when click

// Answers below 

let zooMarker = L.marker([1.4043, 103.7930]);
let airportMarker = L.marker([1.3644, 103.9915]);
let sentosaMarker = L.marker([1.2494, 103.8303]);

zooMarker.addTo(map);
zooMarker.bindPopup("<h4>Singapore Zoological</h4>");
airportMarker.addTo(map);
airportMarker.bindPopup("<h4>Changi Airport</h4>");
sentosaMarker.addTo(map);
sentosaMarker.bindPopup("<h4>Sentosa</h4>")






// Go to Lab 3