import {MongoAbility} from '@casl/ability';

export type Subjects =
  | 'Doctor'
  | 'Provider'
  | 'all'
  | 'Prescription'
  | 'Category'
  | 'Medical'
  | 'Store'
  | 'Role'
  | 'Permission'
  | 'User'
  | 'Analysis'
  | 'Discount';
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type AppAbilities = [Actions, Subjects];
export type AppAbility = MongoAbility<AppAbilities>;
// export type AppAbility = Ability<[Actions, Subjects]>;
export type AclAbility = {
  action: Actions;
  subject: Subjects;
};
