import {PressableProps} from 'react-native';

export type SelectType<T> =
  | {
      showSelect: true;
      onCheckedItem: (item: T) => void;
    }
  | {
      showSelect: false;
      onPress: PressableProps['onPress'];
      onLongPress: (item: T) => void;
      onCheckedLeft: () => void;
      selectIcon: boolean;
    };
