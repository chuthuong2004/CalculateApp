import {View, Pressable} from 'react-native';
import React, {memo} from 'react';
import {TextNormalComponent} from '@components/shares';
import {flex} from '@styles/flex.style';
import {StoreNews, StoreCategoryNews} from '@/types/entities';
import {useNavigation} from '@react-navigation/native';
import {HomeStackScreenProps} from '@navigation/app/home/types';
import {URL_SGOD_API} from '@config';
import Animated, {FadeIn} from 'react-native-reanimated';
import {hp} from '@utils/helpers';

type NewsItemProps = {
  news: StoreNews;
  orientation?: 'vertical' | 'horizontal';
};
const PressableAnimated = Animated.createAnimatedComponent(Pressable);
const NewsItemComponent = ({
  news,
  orientation = 'horizontal',
}: NewsItemProps) => {
  const navigation =
    useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  return (
    <PressableAnimated
      entering={FadeIn.duration(600)}
      onPress={() =>
        navigation.navigate('NewsStack', {
          screen: 'NewsDetails',
          params: {
            slug: news.slug,
          },
        })
      }
      style={[
        orientation === 'horizontal' && flex.row,
        flex.gap10,
        orientation === 'horizontal' && flex.alignItemsCenter,
      ]}>
      <Animated.Image
        entering={FadeIn.duration(300)}
        source={{
          uri: URL_SGOD_API + news.image,
        }}
        resizeMode={orientation === 'horizontal' ? 'cover' : 'contain'}
        style={{
          width: orientation === 'horizontal' ? hp(10) : '100%',
          height: orientation === 'horizontal' ? hp(6) : hp(15),
          borderRadius: hp(0.8),
        }}
      />
      <View style={[orientation === 'horizontal' && flex.flex1, flex.gap4]}>
        <TextNormalComponent variant="primary">
          {(news.categories[0] as StoreCategoryNews).name}
        </TextNormalComponent>
        <TextNormalComponent fontWeight="500" size="sm" numberOfLines={2}>
          {news.title}
        </TextNormalComponent>
      </View>
    </PressableAnimated>
  );
};

export default memo(NewsItemComponent);
