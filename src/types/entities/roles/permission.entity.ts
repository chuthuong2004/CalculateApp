import {Actions, Subjects} from '@/types/commons';

export type StorePermission = {
  _id: string;
  name: string;
  can: boolean;
  action: Actions;
  subject: Subjects | string;
  conditions?: Record<string, string>;
};
export type PermissionSelectable = {
  value: string;
  selectable: boolean;
};
