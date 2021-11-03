// var crs = new L.Proj.CRS('EPSG:2400',
//   '+lon_0=15.808277777799999 +lat_0=0.0 +k=1.0 +x_0=1500000.0 ' +
//   '+y_0=0.0 +proj=tmerc +ellps=bessel +units=m ' +
//   '+towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0 +no_defs',
//   {
//     resolutions: [8192, 4096, 2048] // 3 example zoom level resolutions
//   }
// );

const crsBelgium = new L.Proj.CRS(
    'EPSG:2400',
    '+lon_0=5.0 +lat_0=50.5 +x_0=0 +pm=greenwich ' +
        '+y_0=0 +proj=eqdc +lat_1=55 +lat_2=60 +ellps=bessel +units=m ' +
        '+datum=WGS84',

    {
        resolutions: [
            8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1,
            0.5, 0.1
        ]
    }
);

// var map = L.map('map', {
//   crs: crs,
//   continuousWorld: true,
//   worldCopyJump: false
// });

const map = L.map('map', {
    crs: crsBelgium,
    continuousWorld: true,
    worldCopyJump: false
});
//51,81527 0,89814 - hoek 1
//49,0339 7,11551 - hoek 2

const imageUrl = './BE_talen-gewesten.svg';


// const imageBounds = [[51.81527, 0.89814], [49.0339, 7.11551]];

const imageBounds = L.bounds(
    map.project([51.81527, 0.89814]),
    map.project([49.0339, 7.11551])
);


const imageLayer = L.Proj.imageOverlay(imageUrl, imageBounds).addTo(map);
// const center = imageLayer.getBounds().getCenter();
console.log(imageBounds.getCenter());
map.setView(map.unproject(imageBounds.getCenter()), 7);
// map.setZoom(7);

map.on('zoom', () => {
    console.log({
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        center: map.getBounds().getCenter()
    });
});

map.on('click', (event) => {
    console.log(`${event.latlng.lat},${event.latlng.lng}`);
    navigator.clipboard.writeText(`${event.latlng.lat},${event.latlng.lng}`);
});