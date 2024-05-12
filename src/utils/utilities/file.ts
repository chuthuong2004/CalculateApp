import {StoreImage} from '@/types/entities';
import {Asset} from 'react-native-image-picker';

export function isFileImageServer(image: unknown): image is StoreImage {
  if (image !== null && typeof image === 'object') {
    return 'path' in image;
  }
  return false;
}

export function isFileAsset(object: unknown): object is Asset {
  if (object !== null && typeof object === 'object') {
    return 'uri' in object;
  }
  return false;
}
