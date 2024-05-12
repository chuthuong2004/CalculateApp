import {ResponseMessage} from '@/types/commons';
import {
  StoreAccount,
  StoreDoctor,
  StoreHospital,
  StoreProvider,
} from '@/types/entities';
export type ErrCallbackType = (err: ResponseMessage) => void;

export type CredentialsParams = {
  username: string;
  password: string;
};
export type LoginParams = CredentialsParams & {
  rememberMe?: boolean;
};

type RegisterWithDoctor = {
  type_service: 'DOCTOR_MANAGER';
} & Pick<StoreDoctor, 'graduation_year' | 'workplace'>;
type RegisterWithProvider = {
  type_service: 'PROVIDER_MANAGER';
} & Partial<
  Pick<
    StoreProvider,
    | 'provider_address'
    | 'company_name'
    | 'tax_code'
    | 'logo'
    | 'business_license'
    | 'acronym_name'
  >
>;
type RegisterWithHospital = {
  type_service: 'HOSPITAL_MANAGER';
} & Pick<StoreHospital, 'hospital_address'>;

export type CombineRegisterByAccount =
  | RegisterWithDoctor
  | RegisterWithProvider
  | RegisterWithHospital;
export type RegisterParams = Pick<
  StoreAccount,
  'username' | 'full_name' | 'sex' | 'birthday' | 'address'
> &
  Pick<CredentialsParams, 'password'> &
  CombineRegisterByAccount;
export type ForgotPasswordParams = Pick<StoreAccount, 'username'> & {
  password: string;
  code: string;
};
export type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: StoreAccount | null;
  setLoading: (value: boolean) => void;
  setUser: (value: StoreAccount | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  forgotPassword: (
    params: ForgotPasswordParams,
    errorCallback?: ErrCallbackType,
  ) => void;
};
export type LoginErrorResponse = {
  error: {
    email: string[];
  };
};

// ** Type OTP
export type VerifyOTPParams = {
  email: string;
  code: string;
};
