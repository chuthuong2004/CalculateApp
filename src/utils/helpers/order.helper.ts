import {OrderStatus} from '@/types/unions';

export function getNumberStatus(orderStatus?: OrderStatus): number {
  switch (orderStatus) {
    case 'pending':
      return 1;
    case 'confirm':
      return 2;
    case 'delivering':
      return 3;
    case 'delivered':
    case 'received':
      return 4;
    case 'canceled':
      return 5;
    default:
      return 0;
  }
}
export function getTitleStatus(orderStatus?: OrderStatus | 'imported'): string {
  switch (orderStatus) {
    case 'pending':
      return 'Processing';
    case 'confirm':
      return 'Confirmed';
    case 'delivering':
      return 'Delivering';
    case 'delivered':
      return 'Delivered';
    case 'received':
      return 'Received';
    case 'canceled':
      return 'Canceled';

    case 'imported':
      return 'Đã nhập kho';
    default:
      return '';
  }
}
