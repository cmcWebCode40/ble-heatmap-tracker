import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

type LocationCoords = {
  latitude: number;
  longitude: number;
};

export function useUserLocation() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission not granted.');
        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentPosition.coords;
      setLocation({ latitude, longitude });
    } catch (err: any) {
      console.error('[useUserLocation] Error:', err);
      setError('Failed to get location.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    location,       // { latitude, longitude }
    loading,        // true/false
    error,          // string | null
    refresh: fetchLocation, // manual re-fetch
  };
}
