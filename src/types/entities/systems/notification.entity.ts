import {NotificationTab} from '@/types/unions';
import {StoreImage} from '../medical';

export type StoreNotification = {
  _id: string;
  to_id: string;
  is_to_all: boolean;
  title: string;
  description: string;
  status: 'read' | 'unread';
  navigate: string;
  image: StoreImage;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  from_id: string;
  notification_type: NotificationTab;
};
