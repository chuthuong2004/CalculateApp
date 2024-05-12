import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

// ** Navigation types
import {AccountStackParamList} from '@navigation/app/account/types';
import {QRCodeStackParamList} from '@navigation/app/qrcode/types';
import {CartStackParamList} from '@navigation/app/cart/types';
import {MedicalStackParamList} from '../medical/types';
import {ProductStackParamList} from '../product/types';
import {OrderManagementStackParamList} from '../order-management/types';
import {ChatStackParamList} from '../chat/types';
import {AnalysisStackParamList} from '../analysis/types';
import {NewsStackParamList} from '../news/types';

export type HomeStackParamList = {
  CartStack: NavigatorScreenParams<CartStackParamList>;
  Notification: undefined;
  Home: undefined;
  QRCodeStack: NavigatorScreenParams<QRCodeStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
  ProductStack: NavigatorScreenParams<ProductStackParamList>;
  OrderManagementStack: NavigatorScreenParams<OrderManagementStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  AnalysisStack: NavigatorScreenParams<AnalysisStackParamList>;
  NewsStack: NavigatorScreenParams<NewsStackParamList>;
  Acl: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;
// ** Using
// HomeStackScreenProps<"Home">['navigation'] --- using for navigation home

// ** Composite category & home
type CombineStack = {
  MedicalStack: NavigatorScreenParams<MedicalStackParamList>;
};
export type HomeStackScreenPropsComposite<
  T extends keyof HomeStackParamList,
  D extends keyof CombineStack,
> = CompositeScreenProps<
  HomeStackScreenProps<T>,
  StackScreenProps<CombineStack, D>
>;
