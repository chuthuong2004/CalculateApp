import {RootState} from '@/store/rootReducer';

// ** Redux
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// ** Types
import {CredentialsParams} from '@hooks/types';
import {Nullable, StoreToken} from '@/types/commons';
import {StoreAccount, StoreBaseUser} from '@/types/entities';
import {isProvider} from '@utils/utilities';

type AuthState = {
  user: Nullable<StoreBaseUser & Partial<Pick<StoreToken, 'refresh_token'>>>;
  loadingApp: boolean;
  rememberAccount: Nullable<CredentialsParams>;
};
const initialState: AuthState = {
  user: null,
  loadingApp: true,
  rememberAccount: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      action: PayloadAction<
        StoreBaseUser & Partial<Pick<StoreToken, 'refresh_token'>>
      >,
    ) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setLoadingApp: (state, action: PayloadAction<AuthState['loadingApp']>) => {
      state.loadingApp = action.payload;
    },
    setRememberAccount: (
      state: AuthState,
      action: PayloadAction<AuthState['rememberAccount']>,
    ) => {
      state.rememberAccount = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<StoreAccount>) => {
      if (state.user) {
        state.user.account_id = action.payload;
      }
      // if () {
      //   state.user = {
      //     ...state.user,
      //     account_id: {
      //       ...state.user.account_id,
      //       ...action.payload,
      //     },
      //   };
      // }
    },
    updateInfoBusiness: (state, action: PayloadAction<StoreBaseUser>) => {
      if (isProvider(state.user) && isProvider(action.payload)) {
        state.user.company_name = action.payload.company_name;
        state.user.logo = action.payload.logo;
        state.user.provider_address = action.payload.provider_address;
        state.user.tax_code = action.payload.tax_code;
      }
    },
  },
});

// ** Selectors
export const selectUser = (state: RootState) => state.authMedicalSgod;
export const selectAccount = (state: RootState) =>
  state.authMedicalSgod.rememberAccount;

// ** Actions
export const {
  setCredentials,
  setLoadingApp,
  setRememberAccount,
  logout,
  updateProfile,
  updateInfoBusiness,
} = authSlice.actions;
export default authSlice.reducer;
