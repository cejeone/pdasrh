"use client";

import { useState, useEffect, useRef } from "react";
import type MapView from "@arcgis/core/views/MapView"; // ✅ Import tipe, bukan modul
import { Button } from "@/components/ui/button";
import "@arcgis/core/assets/esri/themes/light/main.css";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null); // ✅ Tipe eksplisit, bukan any

  useEffect(() => {
    const initializeMap = async () => {
      const [Map, MapViewModule, FeatureLayer] = await Promise.all([import("@arcgis/core/Map"), import("@arcgis/core/views/MapView"), import("@arcgis/core/layers/FeatureLayer")]);

      const map = new Map.default({
        basemap: "topo-vector",
      });

      viewRef.current = new MapViewModule.default({
        container: mapRef.current as HTMLDivElement,
        map,
        center: [117.9245, -0.7893],
        zoom: 4,
      });

      const seismicLayer = new FeatureLayer.default({
        url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USGS_Seismic_Data_v1/FeatureServer",
        outFields: ["*"],
        popupTemplate: {
          title: "{place}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                { fieldName: "mag", label: "Magnitude" },
                { fieldName: "time", label: "Time", format: { dateFormat: "short-date-short-time" } },
                { fieldName: "type", label: "Type" },
              ],
            },
          ],
        },
      });

      map.add(seismicLayer);
    };

    if (mapRef.current) {
      initializeMap();
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <header className="p-4">header</header>
      <div className="flex h-screen overflow-hidden">
        <div className={`bg-base-green transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} flex flex-col`}>
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)} className="m-2 text-white">
            {sidebarOpen ? "Collapse" : "Expand"}
          </Button>
          <nav className="flex-1">
            <Button variant="ghost" className="w-full text-left text-white" onClick={() => setMenuOpen(!menuOpen)}>
              Tambah Layer
            </Button>
            {menuOpen && (
              <div className="ml-4 text-white">
                <p>Menu: Direktoral / BPDAS</p>
                <p>Menu: Kategori</p>
                <p>Menu: Pencarian</p>
              </div>
            )}
          </nav>
        </div>

        <div className="relative flex-1">
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
      </div>
    </>
  );
}
