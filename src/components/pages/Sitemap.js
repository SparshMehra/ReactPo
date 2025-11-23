/**
 * Sitemap Component
 *
 * @file Sitemap.js
 * @authors Bhanu Prakash (A00468530), Cole Turner (A00469026)
 * @description Interactive site map with animations, route tracking, and user location
 *
 * Features:
 * - Interactive Leaflet map with POI markers
 * - "YOU ARE HERE" button with map centering
 * - Route tracking with live distance updates
 * - Framer Motion animations for scroll effects
 * - Proper z-index to stay below navbar
 *
 * @returns {JSX.Element} Interactive site map page
 */

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { motion } from "framer-motion";
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
  { id: 1, name: "Trailhead", position: [44.625028, -63.921417], icon: trailHead },
  { id: 2, name: "Farmhouse Foundation", position: [44.625833, -63.920972], icon: farm },
  { id: 3, name: "Well", position: [44.624022, -63.920028], icon: well },
  { id: 4, name: "Sitting Area", position: [44.625028, -63.920417], icon: sitting },
  { id: 5, name: "Coastal Yellow Birch", position: [44.624, -63.920056], icon: birch },
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
];

/**
 * Calculate the shortest path between two points
 * @param {Array} start - Starting coordinates [lat, lng]
 * @param {Array} end - Ending coordinates [lat, lng]
 * @returns {Array} Path coordinates
 */
const findShortestPath = (start, end) => {
  const path = availablePaths[0];
  let startIdx = 0, minStartDist = Infinity;
  path.forEach((pt, idx) => {
    const dist = haversineDistance(start[0], start[1], pt[0], pt[1]);
    if (dist < minStartDist) {
      minStartDist = dist;
      startIdx = idx;
    }
  });
  let endIdx = 0, minEndDist = Infinity;
  path.forEach((pt, idx) => {
    const dist = haversineDistance(end[0], end[1], pt[0], pt[1]);
    if (dist < minEndDist) {
      minEndDist = dist;
      endIdx = idx;
    }
  });
  if (startIdx <= endIdx) {
    return [start, ...path.slice(startIdx, endIdx + 1), end];
  } else {
    return [start, ...path.slice(endIdx, startIdx + 1).reverse(), end];
  }
};

/**
 * Calculate distance between two coordinates (meters)
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in meters
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Default hardcoded user location
const defaultUserLocation = { lat: 44.623917, lng: -63.920472 };

/**
 * Map Center Controller Component
 * Centers map on user location when triggered
 */
const MapCenterController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 17, {
        duration: 1.5,
        easeLinearity: 0.5,
      });
    }
  }, [center, zoom, map]);
  return null;
};

/**
 * Framer Motion animation variants
 */
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

const SiteMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const watchIdRef = useRef(null);
  const mapRef = useRef(null);

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
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [tracking, selectedPOI]);

  /**
   * Handle "YOU ARE HERE" button click
   * Sets user location and centers map with animation
   */
  const handleUserLocation = () => {
    const location = [defaultUserLocation.lat, defaultUserLocation.lng];
    setUserLocation(location);
    setMapCenter(location);
  };

  /**
   * Handle route tracking to POI
   */
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

  // Calculate route points
  let routePoints = [];
  if (tracking && selectedPOI && userLocation) {
    routePoints = findShortestPath(userLocation, selectedPOI.position);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300 relative">

      {/* Page Title with Animation */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white drop-shadow-lg"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Woodland Conservation Area
      </motion.h1>

      {/* YOU ARE HERE Button with Animation */}
      <motion.button
        onClick={handleUserLocation}
        className="mb-8 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 dark:from-green-700 dark:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 text-white rounded-lg shadow-lg transition-all duration-300 font-semibold text-lg"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        📍 YOU ARE HERE
      </motion.button>

      {/* Main Container with Animation */}
      <motion.div
        className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Map Section with Fixed z-index */}
        <motion.div
          className="w-full lg:w-4/5"
          variants={itemVariants}
        >
          <div className="rounded-2xl shadow-2xl border-4 border-green-300 dark:border-green-700 overflow-hidden bg-white dark:bg-gray-800 relative z-0">
            <MapContainer
              center={[44.6245, -63.9209]}
              zoom={16}
              style={{ height: "88vh", width: "100%", position: "relative", zIndex: 0 }}
              scrollWheelZoom={true}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Map Center Controller */}
              <MapCenterController center={mapCenter} zoom={17} />

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

              {/* User location marker */}
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

              {/* Route Polyline */}
              {routePoints.length > 1 && (
                <Polyline positions={routePoints} color="green" weight={7} />
              )}
            </MapContainer>
          </div>

          {/* Distance display with animation */}
          {tracking && selectedPOI && (
            <motion.div
              className="mt-4 text-center text-gray-900 dark:text-white text-lg font-semibold bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Distance to {selectedPOI.name}:{" "}
              {distance
                ? `${(distance / 1000).toFixed(2)} km (${Math.round(distance)} m)`
                : "Calculating..."}
            </motion.div>
          )}
        </motion.div>

        {/* Points of Interest Section with Animation */}
        <motion.div
          className="w-full lg:w-1/5 flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl text-gray-900 dark:text-gray-100 border-2 border-green-300 dark:border-green-700 transition-colors duration-300 relative z-0"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
            Points of Interest
          </h2>
          <ul className="space-y-6">
            {pointsOfInterest.map((poi, index) => (
              <motion.li
                key={poi.id}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <img
                  src={poi.icon}
                  alt={poi.name}
                  className="w-10 h-10 drop-shadow-lg"
                />
                <div>
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {poi.name}
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {poiDescriptions[poi.name]}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Instructions Section with Animation */}
      <motion.div
        className="mt-12 text-center text-gray-800 dark:text-gray-200 max-w-3xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative z-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          Instructions
        </h2>
        <p className="mb-2">
          Click the <span className="font-semibold text-blue-600 dark:text-blue-400">Track Route</span> button on any marker to see the route and live distance to the selected point of interest.
        </p>
        <p className="mt-4">
          Click <span className="font-semibold text-green-600 dark:text-green-400">📍 YOU ARE HERE</span> to display and focus on your location on the map.
        </p>
      </motion.div>
    </div>
  );
};

export default SiteMap;

