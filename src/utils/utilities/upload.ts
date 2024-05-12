import {TypeUpload, UploadFolder} from '@/types/entities';
import {uploadService} from '@services/upload';
import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';

export async function uploadArrayImages(
  fileImages: Asset[],
  folder: UploadFolder,
  type_upload: TypeUpload,
) {
  const formData = new FormData();
  Object.values(fileImages).map(image => {
    formData.append('files', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'ios' && image.uri
          ? image.uri.replace('file://', '')
          : image.uri,
    });
  });

  try {
    const response = await uploadService.multiple(
      folder,
      type_upload,
      formData,
    );
    if (response) {
      return response.imagesUploaded.map(item => ({
        _id: item.imageId,
        path: item.path,
      }));
    }
    return [];
  } catch (error: any) {
    console.log(error?.response?.data);
    return [];
  }
}

export async function uploadSingleImage(
  asset: Asset,
  folder: UploadFolder,
  type_upload: TypeUpload,
): Promise<{
  _id: string;
  path: string;
} | null> {
  const formData = new FormData();
  formData.append('file', {
    name: asset.fileName,
    type: asset.type,
    uri:
      Platform.OS === 'ios' && asset.uri
        ? asset.uri.replace('file://', '')
        : asset.uri,
  });

  try {
    const response = await uploadService.single(folder, type_upload, formData);
    if (response) {
      return {
        _id: response.imageId,
        path: response.path,
      };
    }
    return null;
  } catch (error: any) {
    console.log('13', error);
    return null;
  }
}
