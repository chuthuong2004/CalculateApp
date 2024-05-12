export function handleErrorRetrySWR(
  error: any,
  key: string,
  config: any,
  revalidate: any,
  {retryCount}: any,
) {
  // ** Kiểm tra nếu request trả về lỗi với status 404 và đã được retry đủ số lần cho phép
  console.log('error: ', error);

  if (error?.status === 404 && retryCount >= 3) {
    // Xoá cache của request
    revalidate({retryCount: 0});
  }
}
