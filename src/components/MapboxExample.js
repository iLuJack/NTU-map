import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // Replace this with your own Mapbox access token
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 16.8,
      center: [121.5397, 25.0174], // National Taiwan University coordinates
      pitch: 74,
      bearing: 12.8,
      hash: true,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Changed to dark style for better rain visibility
      projection: 'globe'
    });

    mapRef.current.on('style.load', () => {
      const map = mapRef.current;

      map.setConfigProperty('basemap', 'lightPreset', 'dawn');

      const zoomBasedReveal = (value) => {
        return ['interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value];
      };
    });

    // Cleanup function
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapboxExample;



