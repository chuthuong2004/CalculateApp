import {StackScreen} from '@navigation/types';
import {HomeStackParamList} from './types';
import {HomeScreen} from '@screens/app/home';
export const stacks: StackScreen<HomeStackParamList>[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
];
