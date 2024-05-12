import {StoreAddress} from '@/types/commons';
import {StoreDoctor} from '../doctors';
import {StoreMedicine} from './medicine.entity';

export type StorePrescription = {
  _id: string;
  prescription_code: string;
  doctor_id: StoreDoctor;
  patient_id: PatientInformation;
  date: Date;
  note: string;

  medicals: Array<MedicalItem>;
  total_price: number;
  createdAt: string;
  updatedAt: string;
};

export type PatientInformation = {
  full_name: string;
  address: StoreAddress['address'];
  birthday: string;
  gender: string;
  phone?: string;
};

export type MedicalItem = {
  medical_id: StoreMedicine;
  quantity: number;
  price: number;
  dosage: string;
  usage: string;
};
