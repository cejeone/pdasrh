"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  useEffect(() => {
    const map = L.map("map").setView([-6.914744, 107.60981], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Contoh marker
    L.marker([-6.914744, 107.60981]).addTo(map).bindPopup("Bandung");

    return () => {
      map.remove(); // Bersihkan saat unmount
    };
  }, []);

  return (
    <div id="map" style={{ height: "620px", width: "100%" }}></div>
  );
}
