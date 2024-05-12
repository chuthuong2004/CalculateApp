/* eslint-disable react/no-unstable-nested-components */
import {Avatar, AvatarProps} from '@rneui/themed';
import React, {ReactNode} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Constants

// ** Share Components

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {AvatarStatus} from '@/types/unions';

// ** Constants
import {COLORS} from '@utils/constants';
import {hp} from '@utils/helpers';

type Shape =
  | {kind: 'square'; radius: number}
  | {kind: 'rectangle'; radius: number; width: number; height: number};
interface AvatarComponentProps extends AvatarProps {
  shape?: Shape;
  border?: boolean;
  iconAvatar?: boolean;
  status?: AvatarStatus;
  fallback_color?: string;
  renderAccessory?: () => ReactNode;
}
interface StyleProps extends AvatarComponentProps, StyleSheetProps {}
export default function AvatarComponent({
  size,
  source,
  border,
  iconAvatar,
  status,
  renderAccessory,
  fallback_color,
  ...passProps
}: AvatarComponentProps) {
  const {colors, dark} = useTheme();
  const styles = styling({border, ...passProps, colors, status, dark});
  return (
    <Avatar
      size={size}
      source={
        !source ? (Platform.OS === 'android' ? {uri: '12312'} : source) : source
      }
      {...passProps}
      titleStyle={[
        typeof size === 'number' && {fontSize: size / 3},
        passProps.titleStyle,
      ]}
      containerStyle={[
        styles.container,
        fallback_color ? {backgroundColor: fallback_color} : {},
        passProps.containerStyle,
      ]}>
      {iconAvatar && (
        <Avatar.Accessory
          // Component={
          //   <View>
          //     <AppVectorIcons
          //       type="Ionicons"
          //       name={ICON.Ionicons.cameraOutline}
          //       color={'#d60505'}
          //       size={hp(20)}
          //     />
          //   </View>
          // }
          iconProps={{
            name: 'photo-camera',
          }}
          size={hp(3.5)}
          style={{
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderColor: colors.background,
          }}
        />
      )}
      {renderAccessory ? (
        renderAccessory()
      ) : status ? (
        <Avatar.Accessory
          Component={() => <View />}
          size={hp(1.5)}
          style={styles.status}
        />
      ) : null}
    </Avatar>
  );
}
const styling = ({
  border,
  shape,
  rounded,
  colors,
  status = 'offline',
}: StyleProps) =>
  StyleSheet.create({
    container: {
      borderRadius: rounded
        ? 1000
        : shape?.kind !== 'square'
        ? shape?.radius
        : 0,
      borderWidth: border ? 4 : 0,
      borderColor: colors.background,
      backgroundColor: colors.primary,
    },
    status: {
      backgroundColor: COLORS.status[status],
      borderWidth: 1,
      borderColor: colors.background,
      shadowOpacity: 0,
    },
  });
