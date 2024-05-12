const MODE_TYPE = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};
const MODE_DEFAULT = MODE_TYPE.PRODUCTION;

export const BASE_URL =
  MODE_DEFAULT === MODE_TYPE.PRODUCTION
    ? 'https://sgodgarden.vn'
    : 'http://192.168.68.129:5999';
export const URL_SOCKET =
  MODE_DEFAULT === MODE_TYPE.PRODUCTION
    ? 'https://sgodgarden.vn'
    : 'http://192.168.68.129:9999';
// 45.119.86.80:5905
export const URL_SGOD_API = 'https://assetadmin.sgod.vn';
export const URL_SGOD_WEB = 'https://sgod.vn';
