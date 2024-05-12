import {AccountType} from '@/types/unions';
import {StoreSgod} from './sgod.entity';

export type StoreFeedback = {
  _id: string;
  customer_id: string;
  type: AccountType;
  content: string;
  status: 'pending' | 'confirm';
  approver_id: StoreSgod['_id'];
  delete_by_sgod: boolean;
  delete_by_customer: boolean;
};
