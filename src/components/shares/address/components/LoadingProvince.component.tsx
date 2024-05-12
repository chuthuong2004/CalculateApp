import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {spacing} from '@styles/spacing.style';
import {flex} from '@styles/flex.style';
import {SkeletonComponent} from '@components/shares/skeleton';

const LoadingProvinceComponent = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        spacing('padding').around,
        spacing('padding', 0, 80).bottom,
        flex.gap10,
      ]}
      data={new Array(20).fill(20)}
      renderItem={({index}) => (
        <SkeletonComponent height={15} width={index % 2 === 0 ? 100 : 200} />
      )}
      keyExtractor={(_, index) => `${index}`}
    />
  );
};

export default memo(LoadingProvinceComponent);
