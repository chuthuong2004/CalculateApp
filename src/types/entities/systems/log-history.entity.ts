import {StoreAccount} from '../accounts';

export type StoreLogHistory = {
  _id: string;
  type: 'SGOD' | 'Customer';
  account_id: StoreAccount['_id'];
  full_name: string;
  avatar: string;
  action: string;
  createdAt: string;
};
