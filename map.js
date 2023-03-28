function initMap() {
    if (localStorage.getItem('zip_code')) {
        var postcode = localStorage.getItem('zip_code');
    } else {
        var postcode = '44135'
    }

    createMap(postcode);
    document.getElementById('edit-field-postcode-und-0-value').value = postcode;
}

function createMap(postcode) {

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: getBasicCoordinates(postcode),
        mapId: "d9afd7e5a29f309a",
    });


    const bermudaTriangle = new google.maps.Polygon({
        paths: getPolygonCoordinates(postcode, 'js_map'),
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "red",
        fillOpacity: 0.35,
    });

    bermudaTriangle.setMap(map);

    var findAreaBtn = document.getElementById("find_area");
    findAreaBtn.onclick = function() {
        var postcode = document.getElementById('edit-field-postcode-und-0-value').value;
        localStorage.setItem('zip_code', postcode);
        console.log(postcode);
        location.reload();
    }

    var captureBtn = document.getElementById("snapshot_button");
    captureBtn.onclick = function() {
        loadStaticMap(postcode);
    }
}

function loadStaticMap(postcode) {
    var pathUrl = getPolygonCoordinatesAsPath(postcode, 'static_map')
    var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";
    coordinates = getBasicCoordinates(postcode);
    staticMapUrl += "?center=" + coordinates.lat + "," + coordinates.lng;

    //Set the Google Map Size.
    staticMapUrl += "&size=600x400";
    //Set the Google Map Zoom.
    staticMapUrl += "&zoom=11";
    staticMapUrl += '&path=color:red|weight:2|fillcolor:red' + pathUrl;
    staticMapUrl += "&key=AIzaSyBhjmtYQvp1UpnuKAB5KeCaFfDYq-9gX3s";
    console.log(staticMapUrl);
    var imgMap = document.getElementById("imgMap");
    imgMap.src = staticMapUrl;
    imgMap.style.display = "block";

    var imageField = document.getElementById("url-capture-id").value = staticMapUrl;
};

function getBasicCoordinates(postcode) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://nominatim.openstreetmap.org/search?q=' + postcode + '&polygon_geojson=1&format=json', false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        var data = JSON.parse(request.responseText)[0];
        latLng = {
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lon)
        };
        return latLng;
    }
}

function requestPolygonCoordinates(postcode) {

    const request = new XMLHttpRequest();
    request.open('GET', 'https://nominatim.openstreetmap.org/search?q=' + postcode + '&polygon_geojson=1&format=json', false); // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        var data = JSON.parse(request.responseText)[0];
        return data;
    }
}

function getPolygonCoordinates(postcode, mapType) {

    var data = requestPolygonCoordinates(postcode)
    var latlngs = data.geojson.coordinates;
    switch (mapType) {
        case 'js_map':
            js_api_bounds = [];
            for (var i = 0; i < latlngs[0].length; i++) {
                latlngs[0][i].reverse();
                var js_api_bound = {
                    lat: latlngs[0][i][0],
                    lng: latlngs[0][i][1]
                };
                js_api_bounds.push(js_api_bound);
            }
            console.log(js_api_bounds);
            return js_api_bounds;
            break;
        case 'static_map':
            for (var i = 0; i < latlngs[0].length; i++) {
                latlngs[0][i].reverse();

                var static_api_bound = latlngs[0][i];
                static_api_bounds.push(static_api_bound);
            }
            return static_api_bounds;
            break;
    }
}

function getPolygonCoordinatesAsPath(postcode, mapType) {
    var data = requestPolygonCoordinates(postcode);
    var latlngs = data.geojson.coordinates;
    var pathUrl = '|';
    for (var i = 0; i < latlngs[0].length; i++) {
        latlngs[0][i].reverse();
        pathUrl += latlngs[0][i][0] + "," + latlngs[0][i][1] + "|"
    }
    pathUrl = pathUrl.slice(0, -1);
    return pathUrl;
}

window.initMap = initMap;
