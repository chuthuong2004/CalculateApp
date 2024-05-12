import {
  View,
  ActivityIndicator,
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import React, {memo, useCallback} from 'react';

// ** Share components
import {
  AddItemButtonComponent,
  EmptyComponent,
  SwipeableCategoryItemManagementComponent,
} from '@components/shares';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Constants

// ** Types
import {StoreCategory} from '@/types/entities';
import {useRoute} from '@react-navigation/native';

// ** Custom hooks
import {usePagination, useScrollApp, useSearch} from '@hooks';

// ** Services
import {categoryService} from '@services/medical';
import {MedicalStackScreenProps} from '@navigation/app/medical/types';
import {useSWRConfig} from 'swr';
import ListHeaderComponent from './ListHeader.component';
import {Can} from '@/acl/components';
import Animated from 'react-native-reanimated';
import {APP_WIDTH} from '@utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ListCategoryManagementProps = {
  toggleFilterCategory: () => void;
  handleSelectItemCategory: (
    item: StoreCategory,
    type: 'Edit' | 'Delete',
  ) => void;
  parentId?: string;
  toggleCreateCategory: () => void;
};
const ListCategoryManagementComponent = ({
  toggleFilterCategory,
  handleSelectItemCategory,
  toggleCreateCategory,
  parentId,
}: ListCategoryManagementProps) => {
  const {mutate} = useSWRConfig();
  const {scrollDown, scrollHandler} = useScrollApp();
  const {search, debounceSearch, onChangeSearch} = useSearch();
  const route = useRoute<
    | MedicalStackScreenProps<'CategoryManagement'>['route']
    | MedicalStackScreenProps<'CategoryDetails'>['route']
  >();
  const {data, isLoading, loadMore, refresh, isValidating} = usePagination(
    route.name === 'CategoryManagement'
      ? 'CategoryManagement'
      : `CategoryDetails${route.params._id}`,
    {
      limit: 10,
      sort: 'newest',
      offset: 0,
      parent: parentId ? parentId : undefined,
      search: debounceSearch,
    },
    categoryService.getParent,
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<StoreCategory>) => {
      return (
        <SwipeableCategoryItemManagementComponent
          category={item}
          onSelectItem={handleSelectItemCategory}
        />
      );
    },
    [handleSelectItemCategory],
  );

  const onEndReached = (info: {distanceFromEnd: number}) => {
    if (info.distanceFromEnd === 0 && data && data.docs.length > 0) {
      loadMore();
    }
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={[flex.flex1, spacing('padding').top]}>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={data?.docs}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyComponent />}
        ListHeaderComponent={
          <ListHeaderComponent
            search={search}
            onChangeSearch={onChangeSearch}
            docs={data ? data.docs.length : 0}
            totalDocs={data ? data.totalDocs : 0}
            toggleFilterCategory={toggleFilterCategory}
          />
        }
        contentContainerStyle={[
          flex.gap10,
          spacing('padding').horizontal,
          spacing('padding').bottom,
        ]}
        onRefresh={() => {
          refresh();
          mutate(`CategoryById${parentId}`);
        }}
        refreshing={isValidating}
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoading || isValidating ? (
            <View>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
      />
      <Can I="create" a="Category">
        <AddItemButtonComponent
          onPress={toggleCreateCategory}
          spacingBottom={
            route.name === 'CategoryManagement'
              ? Platform.OS === 'ios'
                ? insets.bottom
                : APP_WIDTH / 15
              : 0
          }
          sharedValue={scrollDown}
        />
      </Can>
    </View>
  );
};

export default memo(ListCategoryManagementComponent);
