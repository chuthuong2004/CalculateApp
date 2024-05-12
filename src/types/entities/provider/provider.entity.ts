import {StoreAddress} from '@/types/commons';
import {StoreBaseUser} from '../accounts';
import {StoreImage} from '../medical';

export interface StoreProvider extends StoreBaseUser {
  provider_boss_id: StoreProvider['_id'];
  provider_address: StoreAddress['address'];
  company_name: string;
  acronym_name: string;
  tax_code: string;
  business_license: Omit<StoreImage, 'owner_id'>;
}
