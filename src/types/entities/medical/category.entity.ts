import {ColorType} from '@/types/unions';
import {StoreIconMedical} from './icon-medical.entity';
import {StoreImage} from './repository.entity';

export type StoreCategory = {
  _id: string;
  name: string;
  children: string[] | StoreCategory[];
  icon?: StoreIconMedical;
  color_icon: ColorType;
  parent?: StoreCategory;
  image?: StoreImage;
};

export type StoreMutableCategory = {
  _id: string;
  name: string;
  parent: string;
  icon?: string;
  color_icon: ColorType;
  image?: string;
};
