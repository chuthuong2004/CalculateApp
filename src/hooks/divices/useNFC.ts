import {useCallback, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import NfcManager, {
  NfcEvents,
  NfcTech,
  TagEvent,
} from 'react-native-nfc-manager';
export function useNFC() {
  const [hasNfc, setHasNfc] = useState<null | boolean>(null);
  useEffect(() => {
    const hasSupportNFC = async () => {
      const supported = await NfcManager.isSupported();
      // if (!supported) {
      //   Alert.alert('Không hỗ trợ NFC');
      // }
      await NfcManager.start();
      setHasNfc(supported);
      // readNdef();
    };
    hasSupportNFC();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      Alert.alert('Tìm thấy tag  !');
    });
    // readNdef();
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  }, []);

  const readNdef = useCallback(async () => {
    let tag: TagEvent | null;
    try {
      console.log('Read tag:');
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      console.log('TAG: ', tag);

      if (tag) {
        const status = await NfcManager.ndefHandler.getNdefMessage();
        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Tag detected');
          Alert.alert(JSON.stringify({tag, status}));
        } else {
          await NfcManager.setAlertMessage('Hello android');
          Alert.alert(JSON.stringify({tag, status}));
        }
      }
    } catch (error) {
      console.log('ERROR NFC: ', error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }, []);
  const scanTag = useCallback(async () => {
    await NfcManager.registerTagEvent();
  }, []);
  return {
    hasNfc,
    readNdef,
    scanTag,
  };
}
