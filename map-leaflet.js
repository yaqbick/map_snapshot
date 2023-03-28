jQuery(document).ready(function(){


//fetch('https://nominatim.openstreetmap.org/search?q=44135&polygon_geojson=1&format=json')
//    .then(function(response) {
//        return response.json();
//    })
//    .then(function(data) {
//        // create a Leaflet GeoJSON layer and add it to the map
//        console.log(data[0].geojson.coordinates);
//        const geojson = JSON.parse(data[0].geojson.coordinates);
//        var geojsonLayer = L.geoJSON(geojson, {
//            style: {
//                color: 'red',
//                weight: 2
//            }
//        }).addTo(myMap);
//
//        // zoom the map to the bounds of the GeoJSON layer
//        myMap.fitBounds(geojsonLayer.getBounds());
//    });


//fetch('https://nominatim.openstreetmap.org/search?q=44135&polygon_geojson=1&format=json')
//  .then(response => response.json())
//  .then(data => {
//    // Extract the GeoJSON from the response
//    console.log(data[0].geojson);
//    const geojson = JSON.parse(data[0].geojson);
//
//    // Add the GeoJSON to the map
//    L.geoJSON(geojson, {
//      style: {
//        color: 'red'
//      }
//    }).addTo(map);
//  })
//  .catch(error => console.error(error));

//var map = L.map('map').setView([52.2297, 21.0122], 13);
//
//// add a tile layer to the map (optional)
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  attribution: 'Map data © OpenStreetMap contributors',
//  maxZoom: 18
//}).addTo(map);
//
//// make a GET request to the Nominatim API
//fetch('https://nominatim.openstreetmap.org/search?q=02-797&polygon_geojson=1&format=json')
//  .then(response => response.json())
//  .then(data => {
//    // create a GeoJSON FeatureCollection
//    var featureCollection = {
//      type: 'FeatureCollection',
//      features: []
//    };
//
//    // loop through the search results and add a GeoJSON feature for each polygon
//    data.forEach(result => {
//    console.log(result)
//      if (result.geojson.type === 'Polygon') {
//        featureCollection.features.push({
//          type: 'Feature',
//          properties: {},
//          geometry: {
//            type: 'Polygon',
//            coordinates: result.geojson.coordinates
//          }
//        });
//      } else if (result.geojson.type === 'MultiPolygon') {
//        result.geojson.coordinates.forEach(coords => {
//          featureCollection.features.push({
//            type: 'Feature',
//            properties: {},
//            geometry: {
//              type: 'Polygon',
//              coordinates: coords
//            }
//          });
//        });
//      }
//    });
//
//    // create a GeoJSON layer and add it to the map
//    L.geoJSON(featureCollection, {
//      style: {
//        color: 'red'
//      }
//    }).addTo(map);
//  })
//  .catch(error => {
//    console.error(error);
//  });

fetch('https://nominatim.openstreetmap.org/search?q=44135&polygon_geojson=1&format=json')
    .then(response => response.json())
    .then(data => {
        // extract the polygon coordinates from the response
//        console.log(data[0].geojson.coordinates)
        var latlngs = data[0].geojson.coordinates;
        var bounds = [];
        for(var i = 0; i<latlngs[0].length; i++) {
        var bound = latlngs[0][i].reverse();
        bounds.push(bound);
        }
        console.log(bounds)

         //create a Leaflet map and add the polygon layer
        const map = L.map('map').setView([52.2298, 21.0118], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);
//        create a red polygon from an array of LatLng points
//       var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];

       var polygon = L.polygon(bounds, {color: 'red',weight: 2 }).addTo(map);
       // zoom the map to the polygon
       map.fitBounds(polygon.getBounds());
    })
    .catch(error => console.error(error));

  var captureBtn = document.getElementById("snapshot_button");
  captureBtn.onclick = function () {
  L.LeafletImage(map, function(err, canvas) {
  if (err) throw err;
  var img = new Image();
  img.src = canvas.toDataURL('image/png');
  var snapshot = document.getElementById('mapSnapshot');
  snapshot.appendChild(img);
  });
    };
//var map = L.map('map').setView([52.2297, 21.0122], 13);
//
//// Add a tile layer to the map
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
//  maxZoom: 18
//}).addTo(map);
//
//// Define the boundaries of the 02-797 zip code area
//var boundaries = [
//  [52.219101, 21.018523], // bottom left
//  [52.219101, 21.030817], // bottom right
//  [52.226983, 21.030817], // top right
//  [52.226983, 21.018523]  // top left
//];
//
//// Create a polygon layer with the zip code boundaries and add it to the map
//var polygon = L.polygon(boundaries, {color: 'red'}).addTo(map);
//
//// Fit the map to the polygon layer bounds
//map.fitBounds(polygon.getBounds());
//
//// Take a snapshot of the map and save it as a PNG image
//L.LeafletImage(map, function(err, canvas) {
//  if (err) throw err;
//  var img = new Image();
//  img.src = canvas.toDataURL('image/png');
//  document.body.appendChild(img);
//});
//var postalCode = "02-797"; // set the zip code you're interested in
//
//var query = '[out:json];area["postal_code"="' + postalCode + '"];out geom;';
//
//fetch('https://overpass-api.de/api/interpreter', {
//  method: 'POST',
//  body: query
//})
//.then(response => response.json())
//.then(data => {
////  var coordinates = data.elements[0].geometry.coordinates[0];
//  console.log(data);
//  console.log(coordinates); // display the coordinates in the console
//});

//const overpassUrl = 'https://overpass-api.de/api/interpreter';
//const query =
//  '[out:json]; area["postal_code"="44135"]->.boundaryarea;(way(area.boundaryarea);>;);out body;';
//
//const encodedQuery = encodeURIComponent(query);
//const apiUrl = `${overpassUrl}?data=${encodedQuery}`;
//
//fetch(apiUrl)
//  .then((response) => response.json())
//  .then((data) => {
//    var bounds = [];
////     bounds.push([data.elements[0].lat, data.elements[0].lon]);
//    for(var i=0.0; i<data.elements.length; i++){
//    if(Number.isInteger(i/500) && data.elements[i].lat != undefined){
//       bounds.push([data.elements[i].lat, data.elements[i].lon]);
//      }
//    }
//    var sortedBounds = quicksort(bounds);
//    console.log(sortedBounds);
//    var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
//    var latlngs = sortedBounds;
//    var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
//     // zoom the map to the polygon
//     map.fitBounds(polygon.getBounds());
////    console.log(`Coordinates: ${bounds.minlat},${bounds.minlon} - ${bounds.maxlat},${bounds.maxlon}`);
//  })
//  .catch((error) => {
//    console.error(error);
//  });
//
//function quicksort(array) {
//  if (array.length <= 1) {
//    return array;
//  }
//
//  const pivot = array[0];
//  const less = [];
//  const greater = [];
//
//  for (let i = 1; i < array.length; i++) {
//    if (array[i][0] < pivot[0] || (array[i][0] === pivot[0] && array[i][1] < pivot[1])) {
//      less.push(array[i]);
//    } else {
//      greater.push(array[i]);
//    }
//  }
//
//  return quicksort(less).concat([pivot], quicksort(greater));
//}

});
