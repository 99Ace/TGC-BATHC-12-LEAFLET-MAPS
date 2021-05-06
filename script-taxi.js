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

// Set up the cluster
let markerCluster = L.markerClusterGroup();
markerCluster.addTo(map)

// data = "https://api.data.gov.sg/v1/transport/taxi-availability"

// Wait for the DOM to be ready before loading
window.addEventListener('DOMContentLoaded', async function(){
    let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');
    let taxis = response.data.features[0].geometry.coordinates
    console.log(taxis)

    for (let each_taxi of taxis) {
      L.marker([ each_taxi[1], each_taxi[0] ]).addTo(markerCluster);
    }
})


setInterval(async function() {
    let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');

    // clear the markerCluster
    markerCluster.clearLayers();

    // reload new coordinates
    let taxis = response.data.features[0].geometry.coordinates
    console.log(taxis)

    for (let each_taxi of taxis) {
      L.marker([ each_taxi[1], each_taxi[0] ]).addTo(markerCluster);
    }
}, 10000)