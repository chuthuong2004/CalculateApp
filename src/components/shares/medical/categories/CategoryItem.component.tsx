import React, {memo} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Share Components
import {CardComponent, TextNormalComponent} from '@components/shares';

import SVGIcon from '@components/global-icons/SvgIcon';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {StoreCategory} from '@/types/entities';

// ** Global Styles
import {flex} from '@styles';

// ** Constants
import {BASE_URL} from '@config/baseUrl';
import {COLORS_APP} from '@utils/constants';
import {hp} from '@utils/helpers';

interface CategoryItemProps extends TouchableWithoutFeedbackProps {
  category: StoreCategory;
  orientation?: 'vertical' | 'horizontal';
  width?: number;
  height?: number;
}
const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  orientation = 'vertical',
  width = hp(10),
  height = hp(9.5),
  ...passProps
}) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, width, height, orientation});

  return (
    <TouchableOpacity
      {...passProps}
      style={[
        flex.alignItemsCenter,
        flex.justifyContentCenter,
        flex.gap8,
        styles.container,
        passProps.style,
        orientation === 'horizontal' && flex.row,
      ]}
      onPress={passProps.onPress}>
      <CardComponent shadow style={styles.icon}>
        {category.image ? (
          <Image
            source={{uri: BASE_URL + category.image.path}}
            style={{width: hp(4.8), height: hp(4.8)}}
          />
        ) : (
          category.icon && (
            <SVGIcon
              width={orientation === 'vertical' ? hp(4.8) : hp(2.4)}
              height={orientation === 'vertical' ? hp(4.8) : hp(2.4)}
              d={category.icon.d}
              fill={COLORS_APP[category.color_icon]}
            />
          )
        )}
        {orientation === 'horizontal' && (
          <TextNormalComponent
            style={[flex.flex1]}
            size="sm"
            align="center"
            textTransform="capitalize"
            numberOfLines={3}>
            {category.name}
          </TextNormalComponent>
        )}
      </CardComponent>
      {orientation === 'vertical' && (
        <TextNormalComponent
          size="sm"
          align="center"
          textTransform="capitalize"
          numberOfLines={3}>
          {category.name}
        </TextNormalComponent>
      )}
    </TouchableOpacity>
  );
};

export default memo(CategoryItem);

const styling = ({
  colors,
  orientation = 'vertical',
  width = 100,
  height = 95,
}: StyleSheetProps &
  Pick<CategoryItemProps, 'orientation' | 'width' | 'height'>) =>
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
