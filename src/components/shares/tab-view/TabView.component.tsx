import React, {memo} from 'react';
import {Route, TabBar, TabView, TabViewProps} from 'react-native-tab-view';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {COLORS_APP} from '@utils/constants';
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';
import {spacing} from '@styles';
import {ButtonComponent} from '../button';
import {TextNormalComponent} from '../text';

interface TabViewComponentProps<T extends Route> extends TabViewProps<T> {}

function TabViewComponent<T extends Route>({
  navigationState,
  onIndexChange,
  initialLayout,
  overScrollMode = 'always',
  style,
  renderScene,
  ...passProps
}: TabViewComponentProps<T>) {
  const layout = useWindowDimensions();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <TabView
      navigationState={navigationState} // {index, routes}
      renderScene={renderScene}
      onIndexChange={onIndexChange} // setIndex
      initialLayout={initialLayout ? initialLayout : {width: layout.width}}
      overScrollMode={overScrollMode}
      style={[spacing('padding', 0, 8).top, style]}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorStyle}
          style={[{backgroundColor: colors.background}]}
          getLabelText={({route}) => route.title}
          renderLabel={({route, focused}) => (
            <ButtonComponent
              size="sm"
              color={focused ? 'primary' : 'secondary'}
              buttonStyle={{borderWidth: 0, paddingVertical: 10}}
              spacingHorizontal={20}>
              <TextNormalComponent
                size="sm"
                variant={focused ? 'dark' : undefined}>
                {route.title}
              </TextNormalComponent>
              {route.accessibilityLabel && ` (${route.accessibilityLabel})`}
            </ButtonComponent>
          )}
          activeColor={COLORS_APP.primary}
          inactiveColor={colors.text}
          pressOpacity={1}
          scrollEnabled
          tabStyle={styles.tabStyle}
          bounces
          contentContainerStyle={[spacing('padding').horizontal]}
        />
      )}
      {...passProps}
    />
  );
}

export default memo(TabViewComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    indicatorStyle: {
      backgroundColor: colors.primary,
      height: 0,
      borderRadius: 4,
    },
    tabStyle: {
      width: 'auto',
      paddingHorizontal: 2,
    },
  });
