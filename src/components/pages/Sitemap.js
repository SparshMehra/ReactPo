// Authors:
// Bhanu Prakash(A00468530) - 'Get Directions' functionality
// Cole Turner (A00469026) - Map interaction, UI design, TailWind CSS
// Purpose: Site map component for the conservation area

import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import trailHead from "../../assets/hiking.png";
import farm from "../../assets/farm.png";
import well from "../../assets/water-well.png";
import sitting from "../../assets/sitting.png";
import birch from "../../assets/birch.png";

// Descriptions for each Point of Interest (POI)
const poiDescriptions = {
  Trailhead: "Start your adventure here! The main entrance to the conservation area.",
  "Farmhouse Foundation": "Historic farmhouse remains, a glimpse into the area's past.",
  Well: "Fresh water source, important for wildlife and visitors.",
  "Sitting Area": "Relax and enjoy the natural surroundings.",
  "Coastal Yellow Birch": "A rare tree species, important for local biodiversity.",
};

// List of POIs with coordinates and icons
const pointsOfInterest = [
  {
    id: 1,
    name: "Trailhead",
    position: [44.625028, -63.921417],
    icon: trailHead,
  },
  {
    id: 2,
    name: "Farmhouse Foundation",
    position: [44.625833, -63.920972],
    icon: farm,
  },
  {
    id: 3,
    name: "Well",
    position: [44.624022, -63.920028],
    icon: well,
  },
  {
    id: 4,
    name: "Sitting Area",
    position: [44.625028, -63.920417],
    icon: sitting,
  },
  {
    id: 5,
    name: "Coastal Yellow Birch",
    position: [44.624, -63.920056],
    icon: birch,
  },
];

// Available paths on the map (for route calculation)
const availablePaths = [
  [
    [44.625028, -63.921417], // Trailhead
    [44.625833, -63.920972], // Farmhouse Foundation
    [44.625028, -63.920417], // Sitting Area
    [44.624, -63.920056],    // Coastal Yellow Birch
    [44.624022, -63.920028], // Well
  ],
  // Add more paths if needed
];

// Calculate the shortest path using available paths (simple slicing)
const findShortestPath = (start, end) => {
  const path = availablePaths[0];
  // Find closest point in path to start
  let startIdx = 0, minStartDist = Infinity;
  path.forEach((pt, idx) => {
    const dist = haversineDistance(start[0], start[1], pt[0], pt[1]);
    if (dist < minStartDist) {
      minStartDist = dist;
      startIdx = idx;
    }
  });
  // Find closest point in path to end
  let endIdx = 0, minEndDist = Infinity;
  path.forEach((pt, idx) => {
    const dist = haversineDistance(end[0], end[1], pt[0], pt[1]);
    if (dist < minEndDist) {
      minEndDist = dist;
      endIdx = idx;
    }
  });
  // Return path slice between start and end
  if (startIdx <= endIdx) {
    return [start, ...path.slice(startIdx, endIdx + 1), end];
  } else {
    return [start, ...path.slice(endIdx, startIdx + 1).reverse(), end];
  }
};

// Calculate distance between two coordinates (meters)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Default hardcoded user location
const defaultUserLocation = { lat: 44.623917, lng: -63.920472 };

const SiteMap = () => {
  // State for user location, tracking, selected POI, and distance
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [distance, setDistance] = useState(null);
  const watchIdRef = useRef(null);

  // Live tracking: update user location and distance as user moves
  useEffect(() => {
    if (tracking && selectedPOI) {
      if ("geolocation" in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setUserLocation([latitude, longitude]);
            setDistance(
              haversineDistance(
                latitude,
                longitude,
                selectedPOI.position[0],
                selectedPOI.position[1]
              )
            );
          },
          () => {},
          { enableHighAccuracy: true }
        );
      }
    }
    // Cleanup geolocation watcher
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [tracking, selectedPOI]);

  // Start route tracking to selected POI
  const handleGetDirectionsClick = (poi) => {
    setSelectedPOI(poi);
    setTracking(true);
    if (userLocation) {
      setDistance(
        haversineDistance(
          userLocation[0],
          userLocation[1],
          poi.position[0],
          poi.position[1]
        )
      );
    }
  };

  // Set hardcoded user location when "YOU ARE HERE" is clicked
  const handleUserLocation = () => {
    setUserLocation([defaultUserLocation.lat, defaultUserLocation.lng]);
  };

  // Calculate route points using available paths
  let routePoints = [];
  if (tracking && selectedPOI && userLocation) {
    routePoints = findShortestPath(userLocation, selectedPOI.position);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
        Woodland Conservation Area
      </h1>

      {/* Button to display hardcoded user location */}
      <button
        onClick={handleUserLocation}
        className="mb-8 px-6 py-3 bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg shadow-lg transition-all duration-300 font-semibold"
      >
        📍 YOU ARE HERE
      </button>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8">
        {/* Map Section */}
        <div className="w-full lg:w-4/5">
          <div className="rounded-2xl shadow-2xl border-4 border-green-300 dark:border-green-700 overflow-hidden bg-white dark:bg-gray-800">
            <MapContainer
              center={[44.6245, -63.9209]}
              zoom={16}
              style={{ height: "88vh", width: "100%" }}
              scrollWheelZoom={true}
            >
              {/* OpenStreetMap tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Render POI markers */}
              {pointsOfInterest.map((poi) => (
                <Marker
                  key={poi.id}
                  position={poi.position}
                  icon={L.icon({
                    iconUrl: poi.icon,
                    iconSize: [56, 56],
                    iconAnchor: [28, 28],
                    popupAnchor: [0, -10],
                  })}
                >
                  <Popup>
                    <strong>{poi.name}</strong>
                    <br />
                    <span className="block text-sm text-gray-700 dark:text-gray-200 mb-2">
                      {poiDescriptions[poi.name]}
                    </span>
                    <button
                      onClick={() => handleGetDirectionsClick(poi)}
                      className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
                    >
                      Track Route
                    </button>
                  </Popup>
                </Marker>
              ))}

              {/* User location marker (red pin) */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={L.icon({
                    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                  })}
                >
                  <Popup>
                    <strong>Your Location</strong>
                  </Popup>
                </Marker>
              )}

              {/* Route Polyline (green, follows available path) */}
              {routePoints.length > 1 && (
                <Polyline positions={routePoints} color="green" weight={7} />
              )}
            </MapContainer>
          </div>
          {/* Distance display */}
          {tracking && selectedPOI && (
            <div className="mt-4 text-center text-gray-900 dark:text-white text-lg font-semibold bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
              Distance to {selectedPOI.name}:{" "}
              {distance
                ? `${(distance / 1000).toFixed(2)} km (${Math.round(distance)} m)`
                : "Calculating..."}
            </div>
          )}
        </div>

        {/* Points of Interest Section */}
        <div className="w-full lg:w-1/5 flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900 dark:text-gray-100 border-2 border-green-300 dark:border-green-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">Points of Interest</h2>
          <ul className="space-y-6">
            {pointsOfInterest.map((poi) => (
              <li key={poi.id} className="flex items-center space-x-4">
                <img src={poi.icon} alt={poi.name} className="w-10 h-10 drop-shadow-lg" />
                <div>
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">{poi.name}</span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {poiDescriptions[poi.name]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-12 text-center text-gray-800 dark:text-gray-200 max-w-3xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Instructions</h2>
        <p className="mb-2">
          Click the <span className="font-semibold text-blue-600 dark:text-blue-400">Track Route</span> button on any marker to see the route and live distance to the selected point of interest.
        </p>
        <p className="mt-4">
          You can also click <span className="font-semibold text-green-600 dark:text-green-400">📍 YOU ARE HERE</span> to display your location on the map.
        </p>
      </div>
    </div>
  );
};

export default SiteMap;
