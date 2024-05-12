import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export async function handleWithImagePicker(
  type_action: 'picker' | 'take_picture',
  callbackSuccess: (assets: Asset[]) => void,
  options?: ImageLibraryOptions | CameraOptions,
) {
  const result =
    type_action === 'take_picture'
      ? await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          ...options,
        })
      : await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 10,
          ...options,
        });
  if (result.assets && result.assets.length > 0) {
    callbackSuccess(result.assets);
  }
}
