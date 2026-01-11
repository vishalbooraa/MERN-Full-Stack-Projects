// map.js

// Use the map token and listing object passed from EJS
const M_token = mapToken;

mapboxgl.accessToken = M_token;

// Create the map centered on the listing coordinates
const map = new mapboxgl.Map({
    container: 'map', // container ID in your HTML
    style: 'mapbox://styles/mapbox/streets-v11', // modern Mapbox style
    center: listing.geometry.coordinates, // dynamic center [lng, lat]
    zoom: 9
});

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

// Add a marker at the listing location
const marker = new mapboxgl.Marker({ color: '#fe424d' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popup
            .setHTML(
                `<h4>${listing.location}, ${listing.country}</h4>
                 <p>Exact location will be provided after booking.</p>`
            )
    )
    .addTo(map);

// Optional: Automatically open the popup
marker.togglePopup();
