import {DataColorsAppDropDown} from '@/types/commons';
import {ColorType} from '@/types/unions';

const dataColorsApp: DataColorsAppDropDown<ColorType>[] = [
  {label: 'Primary', value: 'primary'},
  {label: 'Secondary', value: 'secondary'},
  {label: 'Success', value: 'success'},
  {label: 'Error', value: 'danger'},
  {label: 'Warning', value: 'warning'},
  {label: 'Info', value: 'info'},
];
export default dataColorsApp;
