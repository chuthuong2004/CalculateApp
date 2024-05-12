import {FeaturePackage} from './package.entity';

export type StorePackagePrice = {
  _id: string;
  price_one_user: number;
  price_one_sub: number;
  price_feature: {
    price: number;
    feature: FeaturePackage;
  };
};
