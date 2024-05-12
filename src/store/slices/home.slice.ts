import {RootState} from '@/store/rootReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeModeType} from '@/types/commons';
import {ColorType} from '@/types/unions';

type InitialStateType = {
  theme: ThemeModeType;
  scrollBar: {
    scroll: 'up' | 'down';
  };
  toastContainer: {
    toast: string;
    variant: ColorType;
  };
  isFirst: null | boolean;
  contactSupport: {
    callbackChat: (() => void) | null;
    status: 'open' | 'closed';
  };
};
type PayloadType = InitialStateType;
const initialState: InitialStateType = {
  theme: 'light',
  scrollBar: {
    scroll: 'up',
  },
  toastContainer: {
    toast: '',
    variant: 'success',
  },
  isFirst: true,
  contactSupport: {
    callbackChat: null,
    status: 'closed',
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    setTheme: (
      state: InitialStateType,
      action: PayloadAction<PayloadType['theme']>,
    ) => {
      state.theme = action.payload;
    },
    setScroll: (
      state,
      action: PayloadAction<InitialStateType['scrollBar']>,
    ) => {
      if (action.payload.scroll !== state.scrollBar.scroll) {
        console.log('Scroll');

        state.scrollBar = action.payload;
      }
    },
    setToast: (
      state,
      action: PayloadAction<InitialStateType['toastContainer']>,
    ) => {
      state.toastContainer = action.payload;
    },
    setIsFirst: (state, action: PayloadAction<InitialStateType['isFirst']>) => {
      state.isFirst = action.payload;
    },
    setContactSupport: (
      state,
      action: PayloadAction<InitialStateType['contactSupport']>,
    ) => {
      state.contactSupport = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.homeMedicalSgod.theme;
export const selectToast = (state: RootState) =>
  state.homeMedicalSgod.toastContainer;
export const selectScroll = (state: RootState) =>
  state.homeMedicalSgod.scrollBar;
export const selectIsFirst = (state: RootState) =>
  state.homeMedicalSgod.isFirst;
export const selectContactSupport = (state: RootState) =>
  state.homeMedicalSgod.contactSupport;
export const {setTheme, setToast, setScroll, setIsFirst, setContactSupport} =
  homeSlice.actions;
export default homeSlice.reducer;
