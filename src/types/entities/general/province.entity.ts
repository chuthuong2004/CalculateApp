import {Nullable} from '@/types/commons';

export interface StoreProvince extends StoreProvinceInformation {
  phone_code: number;
  districts: Array<StoreDistrict>;
}

export interface StoreDistrict extends StoreProvinceInformation {
  short_codename: string;
  wards: Array<StoreWard>;
}
export type StoreWard = StoreProvinceInformation &
  Pick<StoreDistrict, 'short_codename'>;

export interface StoreProvinceInformation {
  name: string;
  code: number;
  codename: string;
  division_type: string;
}

export type KeyOfProvince = 'province' | 'district' | 'ward';
export type ParamAddress = Nullable<Record<KeyOfProvince, string>>;

export type StoreProvinceV2 = {
  province_id: string;
  province_name: string;
  province_type: string;
};

export type StoreDistrictV2 = {
  district_id: string;
  district_name: string;
  district_type: string;
  lat: string;
  lng: string;
  province_id: string;
};

export type StoreWardV2 = {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
};

export type StoreProvinceResponse = {
  id: string;
  name: string;
};
