import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkInternet() {
  const [isInternet, setIsInternet] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternet(state.isConnected ? state.isConnected : false);
    });

    return () => {
      unsubscribe();
      // unsubscribe1();
    };
  }, []);
  return isInternet;
}
