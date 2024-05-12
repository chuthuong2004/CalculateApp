// ** Account services
import {StoreAddress} from '@/types/commons';
import {StoreBaseUser} from '../accounts';

export interface StoreHospital extends StoreBaseUser {
  hospital_boss_id: StoreHospital['_id'];
  hospital_address: StoreAddress['address'];
  boss_id: StoreHospital['_id'];
  hospital_id: StoreHospital['_id'];
}
