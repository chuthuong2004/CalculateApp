import axios from 'axios';

// ** Key chain
import * as Keychain from 'react-native-keychain';

// ** Constants
import {RESPONSE_CODE} from '@utils/constants';

// ** Endpoint Config
import {BASE_URL, REFRESH_TOKEN_ENDPOINT, TOKEN_TYPE} from '@config';
import {StoreToken} from '@/types/commons';

const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
  adapter: ['xhr', 'http', 'https'],
});

// ** Interceptor request
axiosClient.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      // ** access token is username, refresh token is password
      const credentials: false | Keychain.UserCredentials =
        await Keychain.getGenericPassword();
      if (credentials && credentials?.username) {
        const token = JSON.parse(credentials.username || '') as StoreToken;
        if (token && token?.access_token) {
          config.headers.Authorization = `${TOKEN_TYPE} ${token.access_token}`;
        }
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

// ** Interceptor response
axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    const prevRequest = error.config;

    if (
      error.response?.status === RESPONSE_CODE.UNAUTHORIZED &&
      prevRequest.sent
    ) {
      prevRequest.sent = true;
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const token = JSON.parse(credentials.username) as StoreToken;
        if (token && token.refresh_token) {
          // ** Refresh token
          const response = await axios.post(
            REFRESH_TOKEN_ENDPOINT,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `${TOKEN_TYPE} ${token.refresh_token}`,
              },
            },
          );
          if (response.status === RESPONSE_CODE.CREATED) {
            // ** set new token
            await Keychain.setGenericPassword(
              JSON.stringify({
                access_token: response.data?.access_token,
                refresh_token: response.data?.refresh_token,
              }),
              credentials.password,
            );
            return axios(prevRequest);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
