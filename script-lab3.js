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


// Function to return a random marker location
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

let markerClusterLayer = L.markerClusterGroup();
let markerClusterLayer2 = L.markerClusterGroup();

// generate 500 markers
for (let i=0; i <500; i++){
  // generate a new marker
  let posMarker = getRandomLatLng(map);
  // save the marker into the cluster
  L.marker(posMarker).addTo(markerClusterLayer)
  // let singaporeMarker = L.marker( [1.29, 103.85] );

}
// markerClusterLayer.addTo(map);

// get own location
navigator.geolocation.getCurrentPosition(position => {
  const { coords: { latitude, longitude }} = position;
  var marker = new L.marker([latitude, longitude], {
    draggable: true,
    autoPan: true
  }).addTo(map);

  // console.log(marker);
})
