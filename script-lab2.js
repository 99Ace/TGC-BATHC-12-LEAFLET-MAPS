let singapore = [ 1.29, 103.85];

let map = L.map('map').setView(singapore, 13); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// SET UP MARKER
let singaporeMarker = L.marker( [1.29, 103.85] );
let zooMarker = L.marker( [1.4, 103.793] );
// ADD THE MARKER TO THE MAP
singaporeMarker.addTo(map);
zooMarker.addTo(map);

// BIND HTML TO MARKER
singaporeMarker.bindPopup(`
<h1>Singapore</h1>
<p>Welcome to Singapore, the Green City</p>
<img src="" alt=""/>
`)
zooMarker.bindPopup(`
<h1>Zoo</h1>
<p>Welcome to Singapore Zoo</p>
<img src="" alt=""/>
`)
// ADDING A LISTENER
singaporeMarker.addEventListener('click', function(){
    alert("Singapore");
})

// CREATE A Circle
let circle = L.circle( singapore, {
    color: 'red', //Border
    fillColor:"orange", // bg-color of circle
    fillOpacity:0.5, // opacity of bg-color
    radius: 1500 //radius of circle in metres
})

// add it to the map
circle.addTo(map);