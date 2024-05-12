import {FlatList, Pressable, View, ViewToken} from 'react-native';
import React from 'react';

// ** Reanimated
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

// ** Lottie
import {AnimationObject} from 'lottie-react-native';

// ** Components
import RenderItem from './RenderItem';
import Pagination from './Pagination';
import ButtonNext from './ButtonNext';
import {TextNormalComponent} from '../text';

// ** Global styles
import {spacing, flex, POSITION_STYLE} from '@styles';

// ** Constants
import {APP_WIDTH, STORAGE_KEY} from '@utils/constants';

// ** Async storage
import {save} from '@utils/storage';

// ** Redux
import {useAppDispatch, useAppSelector} from '@/store';

// ** Selectors
import {selectUser} from '@/store/selectors';

// ** Actions
import {setIsFirst} from '@/store/actions';

// ** Navigation hooks
import {useNavigation} from '@react-navigation/native';

// ** Types
import {RootStackScreenProps} from '@navigation/types';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('@assets/lottie/onboarding/page1.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('@assets/lottie/onboarding/page2.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('@assets/lottie/onboarding/page3.json'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

const OnboardingComponent = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<RootStackScreenProps<'Onboarding'>['navigation']>();
  const {user} = useAppSelector(selectUser);
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0]?.index;
    }
  };
  const skipOnBoard = () => {
    dispatch(setIsFirst(true));
    save<boolean>(STORAGE_KEY.isFirst, true);
    navigation.navigate(user ? 'App' : 'Auth');
  };
  return (
    <View style={[flex.flex1]}>
      <Pressable
        onPress={skipOnBoard}
        style={[
          POSITION_STYLE({
            position: 'top-right',
            distance: {
              top: 50,
              right: 30 - APP_WIDTH / 30,
            },
          }).absolute,
          flex.zIndex,
          spacing('padding').around,
          {},
        ]}>
        <TextNormalComponent variant="dark" size="md">
          Skip
        </TextNormalComponent>
      </Pressable>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index} x={x} />
        )}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          marginHorizontal: 30,
          paddingVertical: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pagination data={data} x={x} />
        <ButtonNext
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingComponent;
