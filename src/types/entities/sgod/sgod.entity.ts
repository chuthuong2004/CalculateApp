import {StoreNotification} from '../systems/notification.entity';
import {StoreRole} from '../roles/role.entity';
import {StoreAccount} from '../accounts/account.entity';

export interface StoreSgod {
  _id: string;
  account_id: StoreAccount['_id'];
  boss_id: StoreSgod['_id'];
  roles: Array<StoreRole>;
  notifications: Array<StoreNotification>;
  isRoot: boolean;
}
