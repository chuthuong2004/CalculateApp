import {GenderType, UserStatus, TypeService} from '@/types/unions';
import {StoreRole} from '../roles';
import {StoreAddress} from '@/types/commons';
import {StoreImage} from '../medical';

export type StoreAccount = {
  _id: string;
  username: string;
  email: string;
  type_service: TypeService;
  phone: string;
  full_name: {
    first: string;
    last: string;
  };
  sex: GenderType;
  birthday: string;
  avatar?: Omit<StoreImage, 'owner_id'>;
  fallback_color: string;
  address: StoreAddress['address'];
  is_block: boolean;
  createdAt: string;
  updatedAt: string;
  refresh_token: string;
  //   ** Ignore
  status: UserStatus;
  roles: StoreRole[];
};
