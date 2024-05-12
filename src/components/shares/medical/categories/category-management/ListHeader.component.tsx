import {View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';

// ** Global styles
import {flex} from '@styles';

// ** Constants
import {ICON} from '@utils/constants';

// ** Share components
import {SearchRoundedComponent} from '@components/shares/search';
import {AppVectorIcons} from '@components/shares/icons';
import {TextNormalComponent} from '@components/shares/text';

import {useTheme} from '@react-navigation/native';
import {hp} from '@utils/helpers';

type ListHeaderProps = {
  docs?: number;
  totalDocs?: number;
  toggleFilterCategory: () => void;
  search: string;
  onChangeSearch: (text: string) => void;
};
const ListHeaderComponent = ({
  docs,
  totalDocs,
  toggleFilterCategory,
  search,
  onChangeSearch,
}: ListHeaderProps) => {
  const {colors} = useTheme();
  return (
    <View>
      <SearchRoundedComponent
        spacingHorizontal={false}
        spacingTop={false}
        value={search}
        onChangeText={onChangeSearch}
        placeholder="Search by name, category code, owner"
      />
      <View style={[flex.row, flex.justifyContentBetween]}>
        <View style={[flex.row, flex.gap4]}>
          <TextNormalComponent size="sm">
            List of categories
          </TextNormalComponent>
          <TextNormalComponent size="sm">
            ({docs}/{totalDocs})
          </TextNormalComponent>
        </View>
        <View>
          <TouchableOpacity
            onPress={toggleFilterCategory}
            style={[
              flex.row,
              flex.gap4,
              flex.alignItemsCenter,
              {
                borderLeftWidth: 1,
                paddingLeft: hp(1),
                borderLeftColor: colors.border,
              },
            ]}>
            <AppVectorIcons
              type="AntDesign"
              name={ICON.AntDesign.filter}
              size={hp(1.6)}
            />
            <TextNormalComponent size="sm">Bộ lọc</TextNormalComponent>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(ListHeaderComponent);
