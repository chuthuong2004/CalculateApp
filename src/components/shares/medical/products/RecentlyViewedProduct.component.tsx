import {TextNormalComponent} from '@components/shares/text';
import React, {memo, useCallback} from 'react';
import {FlatList, ListRenderItemInfo, Pressable, View} from 'react-native';
import ProductItemMedicalComponent from './ProductItemMedical.component';

// ** Utilities
import {getSizeItemWithGridLayout, isProvider} from '@utils';

// ** Global styles
import {flex, spacing} from '@styles';

// ** Types
import {RecentlyProductType} from '@/types/commons';

// ** Constants
import {APP_WIDTH, BREAK_POINT_TABLET} from '@utils/constants';

// ** Redux
import {useAppSelector} from '@/store/index';
import {
  selectUser,
  selectViewedMedicine,
  selectedProvider,
} from '@/store/selectors';

// ** Types
import {StoreMedicine} from '@/types/entities';
import {LinkDetailComponent} from '@components/shares/link-detail';
import {usePagination} from '@hooks/helpers';
import {medicineService} from '@services/medical';
type RecentlyViewedProductProps = {
  onPress: (id: string) => void;
  type: RecentlyProductType;
  onViewAll?: (type: RecentlyProductType) => void;
};
const RecentlyViewedProductComponent = ({
  type,
  onPress,
  onViewAll,
}: RecentlyViewedProductProps) => {
  const providerSelected = useAppSelector(selectedProvider);
  const {user} = useAppSelector(selectUser);
  const {data: suggestionProducts} = usePagination(
    'ProductSuggestion',
    {
      page: 1,
      limit: 10,
      offset: 0,
      sort: '-createdAt',
      provider_id: providerSelected?._id || '',
    },
    isProvider(user)
      ? medicineService.getAllByOwner
      : medicineService.getAllByCustomer,
  );
  const viewedMedicines = useAppSelector(selectViewedMedicine);
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<StoreMedicine>) => (
      <Pressable onPress={() => onPress(`${item._id}`)}>
        <ProductItemMedicalComponent
          style={{
            width: getSizeItemWithGridLayout(
              10,
              APP_WIDTH > BREAK_POINT_TABLET ? 3.2 : 2.1,
            ),
          }}
          showButtonBuy
          product={item}
        />
      </Pressable>
    ),
    [onPress],
  );
  const renderTitle = useCallback(() => {
    switch (type) {
      case 'related':
        return 'Related products';
      case 'recently':
        return 'Recently viewed products';
      case 'most sold':
        return 'Most sold products';
      case 'suggestion':
        return 'Suggestions for you';
      default:
        return '';
    }
  }, [type]);

  if (
    (type === 'recently' && viewedMedicines.length === 0) ||
    (type !== 'recently' && !suggestionProducts?.docs.length)
  ) {
    return null;
  }

  return (
    <View style={[flex.gap10]}>
      <View
        style={[
          flex.row,
          flex.justifyContentBetween,
          flex.alignItemsCenter,
          spacing('padding').horizontal,
        ]}>
        <TextNormalComponent fontWeight="500">
          {renderTitle()}
        </TextNormalComponent>
        {onViewAll && (
          <LinkDetailComponent
            title="View all"
            onPress={() => onViewAll(type)}
          />
        )}
      </View>
      <FlatList
        horizontal
        data={type === 'recently' ? viewedMedicines : suggestionProducts?.docs}
        renderItem={renderItem}
        contentContainerStyle={[
          spacing('padding').horizontal,
          spacing('padding').bottom,
          flex.gap10,
        ]}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(RecentlyViewedProductComponent);
