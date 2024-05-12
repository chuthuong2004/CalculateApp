import {StorePackage} from '../packages';

export type StorePayment = {
  _id: string;
  customer_id: string;
  payment_method_id: string;
  package_id: StorePackage['_id'];
  total_month_pay: number;
  total_pay: number;
  detail: string;
  status: 'pending' | 'accept';
  action_by: string;
};
