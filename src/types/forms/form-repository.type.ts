import {Nullable, StoreAddress} from '../commons';
import {StoreImage, StoreRepository} from '../entities';

export type FormCreateRepository = {
  name: string;
  code: string;
  position_address: Nullable<Omit<StoreAddress['address'], 'specific'>>;
  specific: string;
  images: Array<StoreImage>;
  parent: Nullable<Pick<StoreRepository, '_id' | 'name'>>;
  description: string;
};
