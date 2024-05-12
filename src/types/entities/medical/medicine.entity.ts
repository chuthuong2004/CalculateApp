// ** Account services
import {TypeService} from '@/types/unions';
import {StoreAccount} from '../accounts';

// ** Provider services
import {StoreProvider} from '../provider';

// ** Medical services
import {StoreCategory} from './category.entity';
import {StoreRepository} from './repository.entity';
import {UnitMedicine} from '@/types/commons';

export type StoreMedicine = {
  _id: string;
  name: string;
  medical_code: string;
  QR_code: string;
  owner_id: StoreAccount;
  category_id: StoreCategory;
  detail: string;
  type: TypeService;
  images: StoreImageMedicine[];
  producer: string;
  country: string;
  mfg: string;
  exp: string;
  provider_id: StoreProvider;
  medical_provider_id?: StoreMedicine['_id'];
  units: StoreUnitMedicine[];
  faqs: StoreFAQ[];
  created_by: StoreAccount;
};
export type StoreFAQ = {
  question: string;
  answer: string;
};

export type StoreImageMedicine = {
  _id: string;
  path: string;
};

export type StoreUnitMedicine = {
  _id: string;
  unit: UnitMedicine;
  import_price: number;
  export_price: number;
  contain: number;
  total_quantity: number;
  parent: StoreUnitMedicine;
  children: StoreUnitMedicine;
  is_calculate: boolean;
  can_sell: boolean;
  stores: {
    store_id: StoreRepository;
    quantity: number;
    quantity_sold: number;
  }[];
  medical_id: StoreMedicine;
};
