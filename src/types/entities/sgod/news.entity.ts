import {GenderType} from '@/types/unions';

export type StoreNews = {
  _id: string;
  title: string;
  image: string;
  summary: string;
  content: string;
  author: Partial<StoreUserNews>;
  mode: string;
  tags: string[];
  categories: Array<string | StoreCategoryNews>;
  views: number;
  time_public: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};
export type StoreUserNews = {
  _id?: string;
  avatar?: string;
  full_name: {
    first: string;
    last: string;
  };
  block?: {
    blocked: boolean;
    unblock?: string;
  };
  roles?: Array<UserRole>;
  address?: string;
  email?: string;
  username?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  birthday?: string;
  sex?: GenderType;
  __v?: number;
  status?: 'online' | 'offline' | 'busy';
  loggedAt?: string;
  action?: string;
  refresh_token: string;
  biography: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    reddit: string;
  };
};

export type StoreCategoryNews = {
  _id: string;
  name: string;
  children: StoreCategoryNews[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};
export type NewsMode = {
  timeUpdate: string;
  type: 'Public' | 'Private';
  _id: string;
  __v: number;
};

type UserRole = {
  _id: string;
  name: string;
  permissions: Array<string>;
  createdAt: string;
  updatedAt: string;
  isTeacher: boolean;
  __v: number;
};
