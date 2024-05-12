export type StorePaymentMethod = {
  _id: string;
  type: 'SGOD' | 'Customer';
  owner: {
    account_id: string;
    title: string;
    account_number: string;
    bank: string;
    info_account: string;
  };
  QR: string;
  image: string;
  is_hidden: boolean;
};
