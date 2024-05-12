import {StoreCountry} from '@/types/entities';
import {Nullable} from './common.type';
import {OrderStatus} from '../unions';

export type ResponseData<T> = {
  data: T;
};
export type ResponseMessage = {
  message: string;
};

export type ResponseCountDocuments = {
  countDocuments: number;
};

export type ResponseType<T> = ResponseData<T> & ResponseMessage;

export type ResponsePagination<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: Nullable<number>;
  nextPage: Nullable<number>;
};

export type ResponseCountry = {
  error: boolean;
  msg: string;
  data: Array<StoreCountry>;
};

export type OrderStatsRes = {
  order_status: OrderStatus | 'imported';
  quantity: number;
};

export type RevenueStatsRes = {
  time: string;
  value: number;
};
