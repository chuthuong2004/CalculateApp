import {AccountType} from '@/types/unions';
import {MedicalItem, StorePrescription} from '../medical';
import {StorePaymentCustomer} from '../payments';
import {StoreProvider} from '../provider';

export type StoreTransaction = {
  _id: string;
  provider_id: StoreProvider;
  payment_customer_id: StorePaymentCustomer;
  buyer: string;
  delivery_address: string;
  medical: Array<MedicalItem>;
  total_pay: string;
  payment_status: 'pending' | 'success';
  transaction_status: 'pending' | 'success';
  delivery_status: 'delivering' | 'success';
};
export type StoreTransferring = {
  _id: string;
  from_user: string;
  to_user: {
    type: AccountType;
    recipient_id: string;
  };
  description: string;
  status: 'read' | 'unread';
  prescriptions: Array<StorePrescription>;
};
