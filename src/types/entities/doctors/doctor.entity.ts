// ** Account services
import {StoreBaseUser} from '../accounts';

export interface StoreDoctor extends StoreBaseUser {
  graduation_year: string;
  workplace: {
    place_name: string;
    time_start: string;
    time_end: string;
  }[];
  certificate: string;
}
