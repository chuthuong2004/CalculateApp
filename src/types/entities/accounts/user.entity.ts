import {UserStatus} from '@/types/unions';
import {StoreAccount} from './account.entity';

// ** System services
import {StoreNotification} from '../systems';

// ** Role services
import {StoreRole} from '../roles';

// ** Sgod services
import {StoreSgod} from '../sgod';
import {StoreImage} from '../medical';

export interface StoreBaseUser {
  _id: string;
  account_id: StoreAccount;
  is_root: boolean;
  logo: Omit<StoreImage, 'owner_id'>;
  status: UserStatus;
  package_id: string;
  roles: Array<StoreRole>;
  valid_to: string;
  notifications: Array<StoreNotification>;
  approver_sgod_id: StoreSgod['_id'];
  manager_sgod_id: StoreSgod['_id'];
  owner_id: {
    _id: string;
    account_id: StoreAccount;
  };
}
