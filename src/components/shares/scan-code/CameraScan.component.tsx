import {useCameraGetCode} from '@hooks/divices';
import {flex} from '@styles/flex.style';
import {APP_HEIGHT, APP_WIDTH, COLORS_APP, SIZE_APP} from '@utils/constants';
import {hp} from '@utils/helpers';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Camera, Code, CodeType} from 'react-native-vision-camera';
import {EmptyComponent} from '../empty';
import {TextNormalComponent} from '../text';

type CameraScanProps = {
  type: CodeType[];
  handler: (code: Code['value']) => void;
};
const CameraScan = ({type = [], handler}: CameraScanProps) => {
  const {codeScanner, device, hasPermission} = useCameraGetCode(type, handler);
  // animation
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.7, {duration: 1200, easing: Easing.ease}),
        withTiming(1, {duration: 1200, easing: Easing.ease}),
      ),
      -1,
      true,
    );
  }, [scale]);

  if (!hasPermission || device == null) {
    return <EmptyComponent title={'No camera'} />;
  }
  return (
    <View
      style={[flex.flex1, flex.alignItemsCenter, flex.justifyContentCenter]}>
      <Camera
        codeScanner={codeScanner}
        device={device}
        style={styles.camera}
        isActive={true}
      />
      <View style={styles.topView}>
        <TextNormalComponent variant="dark">
          Quét mã QR hoặc chọn ảnh từ thiết bị
        </TextNormalComponent>
      </View>
      <View style={styles.marker}>
        <Animated.View style={[styles.customMarker, animatedStyles]}>
          <View style={[styles.borderMarker, styles.borderLeft]} />
          <View style={[styles.borderMarker, styles.borderRight]} />
          <View style={[styles.borderMarker, styles.borderBottomRight]} />
          <View style={[styles.borderMarker, styles.borderBottomLeft]} />
        </Animated.View>
      </View>
      <View style={[styles.bottomContainer]}>
        {/* <View
          style={[
            flex.row,
            flex.alignItemsCenter,
            flex.justifyContentCenter,
            flex.flex1,
          ]}>
          <TouchableOpacity
            onPress={toggleFlash}
            style={[styles.icon, flex.alignItemsCenter, flex.gap4]}>
            <AppVectorIcons
              type="Ionicons"
              size={hp(2.5)}
              name="flash-outline"
              color="white"
            />
            <TextNormalComponent align="center" size="sm" variant="dark">
              {isOpenFlash
                ? 'Turn on the flashlight'
                : 'Turn off the flashlight'}
            </TextNormalComponent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={[styles.icon, flex.alignItemsCenter, flex.gap4]}>
            <AppVectorIcons
              type="Ionicons"
              size={hp(2.5)}
              name={'camera-reverse-outline'}
              color="white"
            />
            <TextNormalComponent align="center" size="sm" variant="dark">
              Switch cameras
            </TextNormalComponent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={[styles.icon, flex.alignItemsCenter, flex.gap4]}>
            <AppVectorIcons
              type="Ionicons"
              size={hp(2.5)}
              name={'image-outline'}
              color="white"
            />
            <TextNormalComponent align="center" size="sm" variant="dark">
              Select QR image
            </TextNormalComponent>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default CameraScan;

const SIZE_MARKER = APP_WIDTH - (APP_WIDTH / 12) * 6;
const SIZE_CORNER = hp(0.8);
const styles = StyleSheet.create({
  camera: {
    width: APP_WIDTH,
    height: APP_HEIGHT,
    position: 'absolute',
  },
  // ** Marker
  marker: {
    position: 'absolute',
    top: (APP_HEIGHT * 0.6 - SIZE_MARKER) / 2,
    left: (APP_WIDTH - SIZE_MARKER) / 2,
  },
  customMarker: {
    width: SIZE_MARKER,
    height: SIZE_MARKER,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  borderMarker: {
    width: hp(5),
    height: hp(5),
    position: 'absolute',
    borderColor: COLORS_APP.dark,
  },
  borderLeft: {
    borderLeftWidth: SIZE_CORNER,
    borderTopWidth: SIZE_CORNER,
    left: 0,
    top: 0,
  },
  borderRight: {
    borderRightWidth: SIZE_CORNER,
    borderTopWidth: SIZE_CORNER,
    right: 0,
    top: 0,
  },
  borderBottomRight: {
    borderRightWidth: SIZE_CORNER,
    borderBottomWidth: SIZE_CORNER,
    right: 0,
    bottom: 0,
  },
  borderBottomLeft: {
    borderLeftWidth: SIZE_CORNER,
    borderBottomWidth: SIZE_CORNER,
    left: 0,
    bottom: 0,
  },

  // ** Bottom View
  // ** Top View
  topView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: hp(3),
    width: APP_WIDTH,
  },

  bottomContainer: {
    position: 'absolute',
    backgroundColor: '#3534344d',
    bottom: APP_WIDTH / 30,
    left: APP_WIDTH / 30,
    right: APP_WIDTH / 30,
    borderBottomLeftRadius: SIZE_APP.sm,
    borderBottomRightRadius: SIZE_APP.sm,
    padding: hp(1),
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: hp(2),
    borderColor: 'white',
  },
  image: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(5),
    resizeMode: 'cover',
  },
});
