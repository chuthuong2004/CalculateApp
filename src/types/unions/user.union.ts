export type AccountType = 'Doctor' | 'Provider' | 'HospitalManager' | 'Sgod';
export type AccountService =
  | 'DOCTOR_MANAGER'
  | 'HOSPITAL_MANAGER'
  | 'PROVIDER_MANAGER';
export type TypeService =
  | AccountService
  | 'DOCTOR_USER'
  | 'HOSPITAL_USER'
  | 'PROVIDER_USER'
  | 'SGOD_ADMIN'
  | 'SGOD_USER';
export type GenderType = 'male' | 'female' | 'other';
export type UserStatus = 'pending' | 'active';

export type AvatarStatus = 'online' | 'offline' | 'busy';
