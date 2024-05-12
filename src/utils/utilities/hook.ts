import axios from 'axios';
import {ErrCallbackType} from 'hooks/types';

export function handleErrorHooks(err: unknown, cb?: ErrCallbackType) {
  if (axios.isAxiosError(err) && err.response) {
    if (cb) {
      cb(err.response.data);
    }
  }
}
