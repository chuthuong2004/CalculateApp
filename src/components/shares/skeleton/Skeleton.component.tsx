import {StyleSheet, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {Skeleton, SkeletonProps} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';
import {COLORS} from '@utils/constants';

interface SkeletonComponentProps extends SkeletonProps {
  rounded?: boolean;
  radius?: ViewStyle['borderRadius'];
}
type StyleProps = StyleSheetProps & SkeletonComponentProps;
const SkeletonComponent: React.FC<SkeletonComponentProps> = props => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, ...props});
  return (
    <Skeleton
      animation="wave"
      circle={props.circle}
      width={props.width}
      height={props.height}
      {...props}
      skeletonStyle={[styles.skeleton, props.skeletonStyle]}
      style={[styles.item, styles.radius, props.style]}
    />
  );
};

export default memo(SkeletonComponent);
const styling = ({dark, radius, rounded, circle}: StyleProps) =>
  StyleSheet.create({
    item: {
      backgroundColor: COLORS.skeleton[dark ? 'dark' : 'light'],
    },
    radius: {
      borderRadius: radius ? radius : rounded ? 20 : !circle ? 4 : 100,
    },
    skeleton: {
      backgroundColor: dark ? '#b7b7b71f' : '#dadadb40',
    },
  });
