export type StoreIconMedical = {
  _id: string;
  genre: string;
  name: string;
  d: string[];
  path: string;
};
export type PramsUploadIcon = {
  folder: FolderUpload;
  type_service: ServiceUpload;
};
export type FolderUpload = 'icons';
export type ServiceUpload =
  | 'category_service'
  | 'store_service'
  | 'payment_service';
