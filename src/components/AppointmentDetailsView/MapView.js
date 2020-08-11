import React from "react";
import { Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  getLocation,
  requestLocationPermission
} from "../../utilities/locationHelper/accessLocation";

const { useState, useEffect } = React;
const { height, width } = Dimensions.get("screen");

const latitudeDelta = 0.015;
const longitudeDelta = 0.0121 * (height / width);

function RenderMapView({ mapStyle, doctorCoords }) {
  const [state, updateState] = useState({
    initialRegion: {
      latitudeDelta,
      longitudeDelta,
      latitude: 0,
      longitude: 0
    },
    region: undefined,
    isUserPostionSet: false,
    markers: doctorCoords ? [doctorCoords] : undefined
  });

  const { initialRegion, markers, region, isUserPostionSet } = state;

  useEffect(() => {
    onMapRender();
  }, [isUserPostionSet]);

  function onMapRender() {
    if (!isUserPostionSet) {
      requestLocationPermission({
        onPermision: {
          onGranted: function() {
            return getLocation(getLocationSuccess);
          },
          onDenied: function() {
            return updateState({
              ...state,
              isUserPostionSet: true
            });
          }
        }
      });
    }
  }

  function getLocationSuccess({ coords }) {
    const { latitude, longitude } = coords;
    if (Number(latitude) && Number(longitude) && !isUserPostionSet) {
      const docCoords = doctorCoords
        ? doctorCoords
        : {
            latitude: latitude + 1.8952,
            longitude: longitude + 2.8952
          };

      const allMarkers = [
        docCoords,
        {
          latitude,
          longitude
        }
      ];

      const newRegion = {
        ...initialRegion,
        // latitude,
        // longitude
        latitude: 80.421998333333335,
        longitude: -100.08400000000002
      };

      updateState({
        ...state,
        markers: allMarkers,
        region: newRegion,
        // initialRegion: newRegion,
        isUserPostionSet: true
      });
    }
  }

  const zoom = Math.round(Math.log(360 / 0.1322) / Math.LN2);
  const isThereMarkers = Array.isArray(markers) && markers.length > 0;
  const markersPostions = [
    { latitude: 82.31719833333334, longitude: -100.18880000000001 },
    { latitude: 87.421998333333335, longitude: -105.08400000000002 }
  ];

  return (
    <MapView
      style={mapStyle}
      zoomEnabled={true}
      zoomControlEnabled={false}
      // zoomTapEnabled={false}
      loadingEnabled
      maxZoomLevel={zoom}
      rotateEnabled
      // scrollEnabled={false}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      region={region || initialRegion}
    >
      {markersPostions &&
        markersPostions.map((marker, idx) => (
          <MapView.Marker
            tracksViewChanges
            pinColor="blue"
            coordinate={marker}
            key={idx}
          />
        ))}
    </MapView>
  );
}

// {isThereMarkers && markers.length > 1 && (
//   <MapView.Polyline
//     geodesic
//     coordinates={markers}
//     strokeWidth={0.75}
//     lineDashPattern={[1, 2, 3, 4]}
//     strokeColor="blue"
//     lineJoin="bevel"
//   />
// )}

export default RenderMapView;
