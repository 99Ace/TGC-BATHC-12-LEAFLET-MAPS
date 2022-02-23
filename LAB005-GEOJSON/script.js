// LOAD IN GEOJSON
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

window.addEventListener('DOMContentLoaded', async function () {
    // #1 Load in geojson data 
    let response = await axios.get("data/cycle.geojson");
    let cyclingLayer = L.geoJson(response.data, {
        // Leaflet syntax to render the feature and layer
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.Description);
        }
    }).addTo(map);

    // Set the geoJson track to red
    cyclingLayer.setStyle({
        'color': 'red'
    })

    let response2 = await axios.get("track.geojson");
    console.log(response2.data)
    let trackLayer = L.geoJson(response2.data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.Description);
        }
    }).addTo(map);

    trackLayer.setStyle({
        'color': 'blue'
    })
})



// Go to Lab 2