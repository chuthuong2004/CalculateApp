import {StorePaymentMethod} from './payment-method.entity';

export type StorePaymentCustomer = {
  _id: string;
  payer_account_id: string;
  transaction_id: string;
  recipient_account_id: string;
  payment_method_id: StorePaymentMethod;
  amount: number;
  detail: string;
  status: 'pending' | 'accept';
  action_by: string;
};
