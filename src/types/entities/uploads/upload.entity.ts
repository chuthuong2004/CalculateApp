export type StoreUpload = {
  _id: string;
  owner_id: string;
  folder_name: string;
  file_name: string;
};

export type UploadFolder =
  | 'myself'
  | 'users'
  | 'medicals'
  | 'doctors'
  | 'hospital-managers'
  | 'provider'
  | 'notifications'
  | 'places'
  | 'metadata'
  | 'stores'
  | 'roles'
  | 'logos'
  | 'licenses'
  | 'categories'
  | 'discounts'
  | 'messages';

export type TypeUpload =
  | 'avatar_account'
  | 'medical_image'
  | 'metadata_image'
  | 'store_image'
  | 'role_image'
  | 'logo'
  | 'license'
  | 'category_image'
  | 'discount_image'
  | 'message_image';
