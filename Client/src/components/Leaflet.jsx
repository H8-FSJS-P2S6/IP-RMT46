import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Map() {
    useEffect(() => {
        const map = L.map('map').setView([3.5897, 98.6731], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([3.5897, 98.6731]).addTo(map)
            .bindPopup('Medan, Indonesia')
            .openPopup();
    }, []);

    return (
        <div id="map" style={{ height: '300px' }}></div>
    );
}

export default Map;
