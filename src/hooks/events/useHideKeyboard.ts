import {useEffect} from 'react';
import {Keyboard} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';

/**
 *
 * @param {number} defaultValue Number of SharedValue Reanmiated
 * @see {@link https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue | the @SharedValue tag}
 * @param {boolean} showVisible current keyboard status
 * @param {boolean}isKeyboardHidden Status of keyboard is hidden or show
 * @returns {number} sharedValue Number of shared value
 */
export function useHideKeyboard(
  defaultValue: number,
  showVisible: boolean,
  isKeyboardHidden?: boolean,
) {
  const sharedValue = useSharedValue(defaultValue);
  const svHeightKeyboard = useSharedValue(0);
  useEffect(() => {
    if (!isKeyboardHidden) {
      const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
        sharedValue.value = withTiming(showVisible ? defaultValue : 0);
        svHeightKeyboard.value = withTiming(e.endCoordinates.height, {
          duration: 10,
        });
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        sharedValue.value = withTiming(showVisible ? 0 : defaultValue);
        svHeightKeyboard.value = withTiming(0, {duration: 10});
      });
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [
    sharedValue,
    defaultValue,
    showVisible,
    isKeyboardHidden,
    svHeightKeyboard,
  ]);
  return {sharedValue, svHeightKeyboard};
}
