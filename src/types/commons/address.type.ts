export type StoreAddress = {
  _id: string;
  full_name: string;
  phone: string;
  address: {
    province: string;
    district: string;
    ward: string;
    specific: string;
  };
  type: 'home' | 'office';
  default: boolean;
};
