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
      style: 'mapbox://styles/mapbox/streets-v12', // Changed to streets style which has better font support
      projection: 'globe',
      localFontFamily: false // Add this line to use Mapbox's default fonts
    });

    mapRef.current.on('style.load', () => {
      const map = mapRef.current;
      const layers = mapRef.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      map.setConfigProperty('basemap', 'lightPreset', 'dawn');

      const zoomBasedReveal = (value) => {
        return ['interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value];
      };

      mapRef.current.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    // Cleanup function
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapboxExample;



