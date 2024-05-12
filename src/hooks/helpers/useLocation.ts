import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {useState} from 'react';

// Geocoder.init('AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8');
/**
 * @remarks This hook access to current location
 * @returns {Object} Info current location
 * @property {Object} currentLocation - Value current location
 * @property {function} getCurrentLocation - This function to get current location
 */
export function useLocation() {
  const [currentLocation, setCurrentLocation] = useState<
    Pick<GeolocationResponse['coords'], 'latitude' | 'longitude'> & {
      latitudeDelta: number;
      longitudeDelta: number;
    }
  >();
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);

        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922, // Điều chỉnh giá trị này để điều chỉnh mức zoom
          longitudeDelta: 0.0421, // Điều chỉnh giá trị này để điều chỉnh mức zoom
        });
      },
      error => {
        console.error('Lỗi khi lấy vị trí hiện tại:', error.message);
        return undefined;
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return {currentLocation, getCurrentLocation};
}
