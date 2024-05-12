import {StoreAccount} from '../accounts';
import {StoreMedicine} from './medicine.entity';

export type StoreCart = {
  _id: number;
  cart_items: StoreCartItem[];
  owner_id: StoreAccount;
};
export type StoreCartItem = {
  _id: string;
  medical_id: StoreMedicine;
  quantity: number;
  unit: string;
};
