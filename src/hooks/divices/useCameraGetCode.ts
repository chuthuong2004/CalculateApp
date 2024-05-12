import {useCallback, useEffect, useRef} from 'react';
import {Linking} from 'react-native';
import {
  Code,
  CodeType,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export const useCameraGetCode = (
  type: CodeType[],
  handler: (code: Code['value']) => void,
) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const ref = useRef<string>();
  const refX = useRef<number>();
  const refY = useRef<number>();
  const codeScanner = useCodeScanner({
    codeTypes: Array.from(new Set(['qr', 'ean-13', ...type])),
    onCodeScanned: codes => {
      console.log('Codes: ', codes);

      const isClear =
        refX.current &&
        refY.current &&
        (Math.abs(refX.current - codes?.[0]?.frame?.x) > 200 ||
          Math.abs(refY.current - codes?.[0]?.frame?.y) > 200);
      if (isClear) {
        setTimeout(() => {
          ref.current = undefined;
        }, 1000);
      }
      if (
        isClear ||
        !ref.current ||
        (ref.current && ref.current !== codes?.[0]?.value)
      ) {
        codes?.[0]?.value && handler(codes?.[0]?.value);
        refX.current = codes[0].frame?.x;
        refY.current = codes[0].frame?.y;
        ref.current = codes?.[0]?.value;
      }
    },
  });
  const permissionHandle = useCallback(async () => {
    if (!hasPermission) {
      const response = await requestPermission();
      if (!response) {
        Linking.openSettings();
      }
    }
  }, [hasPermission, requestPermission]);
  useEffect(() => {
    permissionHandle();
  }, [permissionHandle]);

  return {
    device,
    codeScanner,
    hasPermission,
  };
};
