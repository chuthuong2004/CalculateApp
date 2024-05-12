import {setScroll} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {useCallback, useEffect} from 'react';
import {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useScrollApp() {
  const dispatch = useAppDispatch();
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const scrollDown = useSharedValue(1);

  const scrollBottomTab = useCallback(
    (value: 'up' | 'down') => {
      dispatch(setScroll({scroll: value}));
    },
    [dispatch],
  );
  useEffect(() => {
    return () => {
      dispatch(setScroll({scroll: 'up'}));
    };
  }, [dispatch]);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      if (lastContentOffset.value > event.contentOffset.y) {
        if (isScrolling.value) {
          scrollDown.value = withTiming(1);
          runOnJS(scrollBottomTab)('up');
        }
      } else if (lastContentOffset.value < event.contentOffset.y) {
        if (isScrolling.value) {
          scrollDown.value = withTiming(0);
          runOnJS(scrollBottomTab)('down');
        }
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });
  return {
    scrollDown,
    scrollHandler: handleScroll,
  };
}
