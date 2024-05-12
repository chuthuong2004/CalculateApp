import {View} from 'react-native';
import React, {memo} from 'react';
import {flex, spacing} from '@styles';
import SearchBarCustomComponent, {
  SearchBarComponentProps,
} from './SearchBarCustom.component';

interface SearchProps extends SearchBarComponentProps {
  spacingHorizontal?: boolean;
  spacingTop?: boolean;
}
const SearchRoundedComponent = ({
  spacingHorizontal = true,
  spacingTop = true,
  ...passProps
}: SearchProps) => {
  return (
    <View
      style={[
        flex.row,
        spacingTop && spacing('padding').top,
        spacingHorizontal && spacing('padding').horizontal,
      ]}>
      <SearchBarCustomComponent
        style={[flex.flex1, passProps.style]}
        {...passProps}
        rounded
      />
    </View>
  );
};

export default memo(SearchRoundedComponent);
