import {combineReducers} from '@reduxjs/toolkit';
import {homeSlice, authSlice} from './slices';

const rootReducer = combineReducers({
  homeMedicalSgod: homeSlice,
  authMedicalSgod: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
