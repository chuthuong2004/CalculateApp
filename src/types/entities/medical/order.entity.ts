import {MethodOrder} from '@/types/commons';
import {OrderStatus} from '@/types/unions';
import {DeliveryMethod} from '@services/types';
import {StoreAccount} from '../accounts';
import {StoreMedicine, StoreUnitMedicine} from './medicine.entity';

export type StoreOrder = {
  _id: string;
  user_id: StoreAccount;
  provider_id: StoreAccount;
  order_id: string;
  name: string;
  pricing: StorePricingOrder;
  order_items: StoreOrderItem[];
  order_status: OrderStatus;
  payment: StoreOrderPayment;
  order_track: StoreOrderTracking;
  createdAt: string;
  updatedAt: string;
  delivery: StoreOrderDelivery;
  reason_canceled: string;
  imported?: boolean;
  imported_at?: string;
  evaluated?: boolean;
};

export type StorePricingOrder = {
  total_price: number;
  discount_price: number;
  shipping_price: number;
  provisional_price: number;
};
export type StoreOrderTracking = {
  time_created: string;
  time_confirm: string;
  time_delivering: string;
  time_delivered: string;
  time_received: string;
  time_canceled: string;
};

export type StoreOrderPayment = {
  method: MethodOrder;
  payment_status: OrderPaymentStatus;
};

export type OrderPaymentStatus = 'pending';
export type TabOrder = {
  title: KeyTabOrder;
};

export type StoreOrderItem = {
  _id: string;
  medical_id: StoreMedicine;
  quantity: number;
  unit: StoreUnitMedicine['unit'];
  price: number;
};

export type StoreOrderDelivery = DeliveryMethod & {
  note: string;
  delivery_time: {
    date: string;
    time: string;
  };
};
export type KeyTabOrder =
  | ''
  | 'pending'
  | 'confirm'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'received'
  | 'imported'
  | 'completed'
  | 'canceled'
  | 'return';
