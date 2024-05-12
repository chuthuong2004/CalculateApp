export type StorePackage = {
  _id: string;
  customer_id: string;
  package: FeaturePackage;
  max_user: number;
  max_sub_user: number;
  valid_to: Date;
  total_pay: number;
};

export type FeaturePackage =
  | 'ownLogo'
  | 'exportFile'
  | 'enCode'
  | 'createCustomRole'
  | 'blockUser'
  | 'viewHistory';

export type DiscountPrice = {
  _id: string;
  total_month: number;
  discount: number;
};
