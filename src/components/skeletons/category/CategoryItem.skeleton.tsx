import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Share Components
import {SkeletonComponent} from '@components/shares';

// ** Global Styles
import {flex} from '@styles';

// ** Shadow Lib
import {Neomorph} from 'react-native-neomorph-shadows';

// ** Types
import {StyleSheetProps} from '@/types/commons';

type CategoryItemSkeletonProps = {
  width?: number;
  height?: number;
  orientation?: 'vertical' | 'horizontal';
  style?: ViewStyle;
};
const CategoryItemSkeleton: React.FC<CategoryItemSkeletonProps> = ({
  orientation = 'vertical',
  width = 95,
  height = 100,
  style,
}) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, height, width, orientation});
  return (
    <View
      style={[
        flex.alignItemsCenter,
        flex.justifyContentCenter,
        flex.gap8,
        styles.container,
        style,
        orientation === 'horizontal' && flex.row,
      ]}>
      <Neomorph
        inner={false} // <- enable shadow inside of neomorph
        swapShadows={false} // <- change zIndex of each shadow color
        style={styles.icon}>
        <View style={[flex.row, flex.alignItemsCenter, flex.gap8]}>
          <SkeletonComponent
            circle
            width={orientation === 'vertical' ? 60 : 40}
            height={orientation === 'vertical' ? 60 : 40}
          />
          {orientation === 'horizontal' && (
            <SkeletonComponent width={60} height={15} />
          )}
        </View>
      </Neomorph>
      {orientation === 'vertical' && (
        <SkeletonComponent rounded width={80} height={15} />
      )}
    </View>
  );
};

export default memo(CategoryItemSkeleton);

const styling = ({
  colors,
  orientation = 'vertical',
  width = 100,
  height = 95,
}: StyleSheetProps &
  Pick<CategoryItemSkeletonProps, 'orientation' | 'width' | 'height'>) =>
  StyleSheet.create({
    container: {},
    icon: {
      shadowRadius: 10,
      padding: 5,
      borderRadius: 10,
      backgroundColor: colors.background,
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: 4,
    },
  });
