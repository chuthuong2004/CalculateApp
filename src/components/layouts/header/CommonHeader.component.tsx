import React from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, View} from 'react-native';

// ** Share Components
import {
  AppVectorIcons,
  BadgeCartComponent,
  TextNormalComponent,
} from '@components/shares';

import {hp} from '@utils';
// ** Global Styles
import {flex, spacing} from '@styles';

// ** Constants
import {COLORS_APP, ICON} from '@utils/constants';

type PropsScreen = {
  title?: string;
  goBackNavigation?: () => void;
  searchNavigation?: () => void;
  homeNavigation?: () => void;
  cartNavigation?: () => void;
  textTransform?: TextStyle['textTransform'];
  height?: number;
  renderRightAction?: React.ReactNode;
};

const CommonHeader = ({
  title,
  height,
  goBackNavigation,
  searchNavigation,
  homeNavigation,
  cartNavigation,
  textTransform = 'capitalize',
  renderRightAction,
}: PropsScreen) => {
  return (
    <View
      style={[
        flex.row,
        flex.justifyContentBetween,
        styles.container,
        height ? {height: height} : {},
        // {paddingTop: insets.top},
      ]}>
      <View style={[styles.headingLeft]}>
        {goBackNavigation && (
          <TouchableOpacity
            style={[
              spacing('padding', 0, 16).vertical,
              spacing('padding', 0, 16).right,
            ]}
            onPress={() => goBackNavigation && goBackNavigation()}>
            <AppVectorIcons
              type="Entypo"
              name={ICON.Entypo.arrowBack}
              color={COLORS_APP.dark}
              size={hp(2.5)}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.headingCenter]}>
        {title && (
          <TextNormalComponent
            textTransform={textTransform}
            fontWeight="500"
            color={COLORS_APP.dark}
            align="center">
            {title}
          </TextNormalComponent>
        )}
      </View>
      <View style={[styles.headingRight]}>
        {renderRightAction ? (
          renderRightAction
        ) : (
          <>
            {searchNavigation && (
              <TouchableOpacity
                onPress={() => searchNavigation && searchNavigation()}>
                <AppVectorIcons
                  type="Octicons"
                  name={ICON.Octicons.search}
                  size={hp(2.4)}
                  primary
                />
              </TouchableOpacity>
            )}
            {cartNavigation && (
              <BadgeCartComponent onPress={cartNavigation} color="dark" />
            )}
            {homeNavigation && (
              <TouchableOpacity
                onPress={() => homeNavigation && homeNavigation()}>
                <AppVectorIcons
                  type="Octicons"
                  name={ICON.Octicons.home}
                  size={hp(2.4)}
                  primary
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: `${100 / 30}%`,
    zIndex: 10,
  },
  headingLeft: {
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  headingCenter: {
    height: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRight: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    flex: 1,
  },
});

export default CommonHeader;
