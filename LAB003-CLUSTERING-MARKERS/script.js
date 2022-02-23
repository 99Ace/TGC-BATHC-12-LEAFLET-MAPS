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

// Set up a function to create random marker
// This function is not part of Leaflet 
// It is created to generate ONE random marker
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

// #1 Create marker cluster group
let markerClusterLayer = L.markerClusterGroup();

// #2 Create a For loop and generate 1000 random markers
for (let i = 0; i < 1000; i++) {
    // Call the function and generate one random marker
    let pos = getRandomLatLng(map);

    // add the random marker to the Cluster Layer
    L.marker(pos).addTo(markerClusterLayer);
    
}

// #3 Add the Cluster Layer to the map
markerClusterLayer.addTo(map);

// #4 To clear the Cluster Layer:
document.querySelector("#clear-cluster")
    .addEventListener('click', function(){
        // Command to remove cluster  map.removeLayer( Cluster Layer to be remove )
        map.removeLayer(markerClusterLayer)
        // note: without the following 2 lines, the taxi and earthquake markers will not be cleared
        map.removeLayer(taxiClusterLayer)
        map.removeLayer(earthquakeClusterLayer)
    })

// HANDS ON 
// PRACTICAL 1
// From the URL https://api.data.gov.sg/v1/transport/taxi-availability we can obtain a JSON which contains a list of available taxis in Singapore. Use the JSON Pathfinder website to locate the exact path to the list of taxis. Use marker cluster groups to place the taxi on to the map.

let taxiApi = "https://api.data.gov.sg/v1/transport/taxi-availability"
let taxiClusterLayer = L.markerClusterGroup();

document.querySelector("#load-taxi")
    .addEventListener('click', async function (){
        // Use axios to download from api
        let response = await axios.get(taxiApi);
        // navigate to the array where the latlng is
        console.log(response.data.features[0].geometry.coordinates)

        // assign to taxiData variable, the array of the taxi latlng
        let taxiData = response.data.features[0].geometry.coordinates;

        // go through the array and add each taxi latlng to marker Cluster Layer
        for (let taxi of taxiData) {
            let pos = [taxi[1],taxi[0] ];
            L.marker(pos).addTo(taxiClusterLayer);
        }
        // Show Taxi Cluster Layer on Map
        taxiClusterLayer.addTo(map)
    })



// PRACTICAL 2
// From the URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson 
// we can obtain a JSON of recent earthquakes. 

// Write the code to display all the earthquake locations as markers, 
// and use marker clustering to group them.  
// Try to also make it such that when you click on the marker	
// It also shows a popup and displays the name of the place that had the earthquake.

// Hint: The geometry field of each object in the features array has three numbers. 
// We just need the first two, which are the latitude and longitude.

let earthquakeApi = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
let earthquakeClusterLayer = L.markerClusterGroup();

document.querySelector("#load-earthquake")
    .addEventListener('click', async function (){
        // Use axios to download from api
        let response = await axios.get(earthquakeApi);
        // navigate to the array where the latlng is
        console.log(response.data.features)

        // assign to taxiData variable, the array of the taxi latlng
        let earthquakeData = response.data.features;

        
        // go through the array and add each taxi latlng to marker Cluster Layer
        for (let place of earthquakeData) {
            // organise in marker format, else bindPopup does not work
            let posMarker = L.marker( [ place.geometry.coordinates[1] , place.geometry.coordinates[0]] )
            // get the location info
            let location = place.properties.place;

            // bind the popup info to the marker
            posMarker.bindPopup(`<h4>${location}</h4>`);
            
            // push to earthquakeClusterLayer
            posMarker.addTo( earthquakeClusterLayer )
        }
        // Show Earthquake Cluster Layer on Map
        earthquakeClusterLayer.addTo(map)
    })


// Go to Lab 4