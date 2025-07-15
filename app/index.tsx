import { colors } from "@/constants";
import { useBluetooth } from "@/contexts/BluetoothContext";
import { useUserLocation } from "@/hooks/useUserLocation";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Circle, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const getHeatColor = (rssi: number) => {
  if (rssi >= -40) return colors.dark.red[100];
  if (rssi >= -60) return colors.dark.orange[100];
  if (rssi >= -80) return colors.dark.blue[100];
  return colors.dark.blue[200];
};

const getEstimatedDistance = (rssi: number, txPower = -59, n = 2.2): number => {
  if (rssi === 127 || rssi === 0) return -1;
  const ratio = (txPower - rssi) / (10 * n);
  const distance = Math.pow(10, ratio);
  return Math.max(1, parseFloat(distance.toFixed(2))); // min 1m
};

export default function BLEHeatMapScreen() {
  const { location, loading } = useUserLocation();

  const { startScan, isScanning, discoveredPeripherals } = useBluetooth();

  useEffect(() => {
    startScan();

    const interval = setInterval(() => {
      startScan();
      // 10 seconds
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formattedResponse = useMemo(
    () =>
      discoveredPeripherals.map((item) => ({
        name: item.name,
        localName: item.name,
        rssi: item.rssi,
        id: item.id,
      })),
    [discoveredPeripherals]
  );

  const getOffsetInDegrees = (meters: number): number => {
    const metersPerDegree = 111000;
    return meters / metersPerDegree;
  };

  const getDeviceOffset = (id: string, maxOffsetInMeters = 10) => {
    const seed = Array.from(id).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const angle = (seed % 360) * (Math.PI / 180); // Convert to radians
    const distance = ((seed % 100) / 100) * maxOffsetInMeters; // 0–max meters

    const latOffset = Math.cos(angle) * getOffsetInDegrees(distance);
    const lngOffset = Math.sin(angle) * getOffsetInDegrees(distance);

    return { latOffset, lngOffset };
  };

  if (loading) {
    return (
      <View className="bg-black-100 flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.dark.orange[100]} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.map} className="flex-1 bg-black-100 relative">
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0004,
            longitudeDelta: 0.0004,
          }}
          initialCamera={{
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 90,
            heading: 0,
            zoom: 18,
            altitude: 200,
          }}
          showsBuildings={true}
          showsCompass={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
        >
          {formattedResponse.map((device) => {
            const radius = getEstimatedDistance(device.rssi);
            if (radius < 0) return null;
            const { latOffset, lngOffset } = getDeviceOffset(device.id, 20);

            return (
              <Circle
                key={device.id}
                center={{
                  latitude: location.latitude + latOffset,
                  longitude: location.longitude + lngOffset,
                }}
                radius={2}
                fillColor={getHeatColor(device.rssi)}
              />
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8ec7f5" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#0a0a0a" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#3f3f3f" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#202020" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1c1c1c" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263238" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#3a3a3a" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1f1f1f" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0a2a42" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1e88e5" }],
  },
];

// if (loading) {
//   return (
//     <View className="bg-black-100 flex-1 justify-center items-center">
//       <ActivityIndicator size={"large"} color={colors.dark.orange[100]} />
//     </View>
//   );
// }
