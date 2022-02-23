// Step 3| Initialize the map
let singapore = [1.29, 103.85];
let map = L.map('map').setView(singapore, 13);
let apiKey = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

L.tileLayer(apiKey, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// #1 Add function that generates random markers
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;
    // return a latlng as required in leaflet format
    return [randomLat, randomLng];
}

// #7 Add this event listener, add before the map scripts
document.querySelector("#btn-layer")
    .addEventListener('click', function () {
        // use hasLayer() to check if the map already have the shopping layer group
        // reminder: group2 contains all the circles
        if (map.hasLayer(group2)) {
            // Leaflet command to remove group from layer
            map.removeLayer(group2);
        } else {
            // Leaflet command to add group to layer
            map.addLayer(group2);
        }
    
})

// #2 CREATE 1ST LAYER GROUP
// 2.1 create the layer group1
//     groupName = leaflet syntax to create the group
let group1 = L.layerGroup();

// 2.2 add markers to the group1
L.marker(getRandomLatLng(map)).addTo(group1);
L.marker(getRandomLatLng(map)).addTo(group1);
L.marker(getRandomLatLng(map)).addTo(group1);

// 2.3 add the group layer to the map
group1.addTo(map);

// #3 CREATE 2ND LAYER GROUP
// 3.1 create group2  
let group2 = L.layerGroup();
// 3.2 assign 5 random markers to group2
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
        color: 'red',
        fillColor: "orange",
        fillOpacity: 0.5,
        radius: 500
    }).addTo(group2);
}

// #4 CREATE 3RD LAYER GROUP
// 4.1 create group3
let group3 = L.layerGroup();
// 4.2 assign 5 random markers to group3
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map), {
        color: 'red',
        fillColor: "green",
        fillOpacity: 0.5,
        radius: 250
    }).addTo(group3);
}

// #5 SETUP BASELAYERS
// #5.1 assign the groups to baselayers
let baseLayers = {
    'Markers': group,
    'Circles': group2
}
// #5.2 assign the groups to overlays
let overlays = {
    'Green Circle': group3
}

// #6 Add the layers to the map
L.control.layers(baseLayers, overlays).addTo(map);



// Go to Lab 5