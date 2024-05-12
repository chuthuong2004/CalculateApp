import {TypeService} from '@/types/unions';
import {StoreAccount, StoreBaseUser} from '../accounts';
import {StoreAddress} from '@/types/commons';

export type StoreImage = {
  _id: string;
  path: string;
  owner_id: string;
};
export type StoreRepository = {
  _id: string;
  images: StoreImage[];
  name: string;
  code: string;
  owner_id: string | StoreBaseUser;
  created_by: StoreAccount;
  position_address: StoreAddress['address'];
  parent: StoreRepository;
  children: Array<StoreRepository>;
  type: TypeService;
  createdAt: string;
  updatedAt: string;
  description: string;
};
