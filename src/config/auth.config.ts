import {BASE_URL_AUTH_SERVICE} from './baseUrl';

// ! replace: `${BASE_URL_AUTH_SERVICE}/login`
export const LOGIN_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/login`; // ** login endpoint

// ! replace: `${BASE_URL_AUTH_SERVICE}/logout-sgod`
export const LOGOUT_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/logout-sgod`; // ** logout endpoint

// ! replace: `${BASE_URL_AUTH_SERVICE}/reset-password`
export const RESET_PASSWORD_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/reset-password`; // ** reset password endpoint

// ! replace: `${BASE_URL_AUTH_SERVICE}/change-password`
export const CHANGE_PASSWORD_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/reset-password`; // ** change password endpoint

// ! replace `${BASE_URL_AUTH_SERVICE}/root`; // ** create account root
export const CREATE_ACCOUNT_ROOT_ENDPOINT = '/users'; // ** create account root

export const PROFILE_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/info-myself`;

// ! replace: `${BASE_URL_AUTH_SERVICE}/refresh-token`
export const REFRESH_TOKEN_ENDPOINT = `${BASE_URL_AUTH_SERVICE}/refresh-token`; // ** refresh token endpoint
export const FIREBASE_TOKEN_ENDPOINT = '/auth/token'; // ** firebase token endpoint
export const storageTokenKeyName = 'accessToken';
export const onTokenExpiration = 'refreshToken'; // logout | refreshToken
// ** This will be prefixed in authorization header with token
// ? e.g. Authorization: Bearer <token>
export const TOKEN_TYPE = 'Bearer';
