import {StoreDoctor} from '../doctors';
import {StoreHospital} from '../hospital';
import {StoreImage, StoreMedicine} from '../medical';
import {StoreProvider} from '../provider';

export type StoreDiscount = {
  _id: string;
  code: string;
  image: StoreImage; // ** Hình ảnh chiết khấu
  name: string; // ** tên chiết khấu
  description: string; // ** mô tả
  percentage: number; // ** số phần trăm
  start_date: string; // ** ngày áp dụng
  end_date: string; // ** ngày hết hạn
  is_active: boolean; // ** trạng thái hoạt động của chiết khấu
  created_by: StoreProvider; // ** chiết khấu được tạo bởi ?
  minimum_order_value: number; // ** giá trị đơn hàng tối thiếu để áp dụng chiết khấu
  maximum_discount_amount: number; // ** Giới hạn số tiền tối đa mà chiết khấu có thể giảm.
  conditions?: object; // ** Điều kiện áp dụng chiết khấu // Ví dụ : {customer_type: "new", registration_date: {"$lte": "30 days"}}
  discount_type: 'percentage' | 'shipment' | 'amount' | 'gift'; // ** loại chiết khấu...v.v
  usage_limit: number; // ** Giới hạn số lượng sử dụng chiết khấu
  usage_count: number; // ** Số lần sử dụng
  combinable?: boolean; // ** Xác định chiết khấu có thể sử dụng kết hợip với các chiết khấu khác không ?
  applicable_customers?: Array<StoreDoctor | StoreHospital>; // ** danh sách khách hàng mà chiết khấu có thể áp dụng;
  applicable_products?: Array<StoreMedicine>; // ** Danh sách sản phẩm mà chiết khấu có thể sử dụng
  createdAt: string;
  updatedAt: string;
};

export type StoreSendDiscount = {
  _id: string;
  discount_id: StoreDiscount;
  partner: string;
};
