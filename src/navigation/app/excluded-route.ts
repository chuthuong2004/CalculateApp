import {AccountStackParamList} from './account/types';
import {ChatStackParamList} from './chat/types';
import {HomeStackParamList} from './home/types';
import {MedicalStackParamList} from './medical/types';
import {QRCodeStackParamList} from './qrcode/types';

export const excludedMedical: Array<keyof MedicalStackParamList> = [
  'CartStack',
  'Notification',
  'ProductStack',
  'Category',
  'MedicalIcons',
  'RepositoryDetails',
  'FormRepository',
  'FormMedicine',
  'FormCategory',
  'RoleStack',
  'CategoryDetails',
  'PrescriptionStack',
  'Acl',
  'StaffStack',
  'DiscountStack',
  'CustomerManagementStack',
  'OrderManagementStack',
  'SelectCategoryParent',
  'CategoryManagement',
  'Repository',
  'SelectAddress',
  'MapView',
  'SelectRepositoryParent',
];

export const excludedHome: Array<keyof HomeStackParamList> = [
  'QRCodeStack',
  'CartStack',
  'Notification',
  'ProductStack',
  'OrderManagementStack',
  'ChatStack',
  'AccountStack',
  'NewsStack',
  'Acl',
  'AnalysisStack',
];
export const excludedQRCode: Array<keyof QRCodeStackParamList> = [
  'QRCode',
  'MyQRCode',
];
export const excludedChat: Array<keyof ChatStackParamList> = [
  'Message',
  'CreateChat',
  'GroupChat',
  'ForwardMessage',
  'UserChatDetails',
  'ImageMessageDetails',
];
export const excludedSetting: Array<keyof AccountStackParamList> = [
  'QRCodeStack',
  'Language',
  'Theme',
  'TermsAndConditions',
  'PrivacyPolicy',
  'ContactAndSupport',
  'Introduce',
  'OperatingRegulations',
  'MyPrescription',
  'Favorites',
  'PaymentCard',
  'PersonalInformation',
  'Business',
  'UpdateProfile',
  'UpdateBusiness',
  'ChangePassword',
  'Address',
  'Phone',
  'Email',
  'OTP',
];
