import {View, Platform, Image} from 'react-native';
import React, {memo} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ** Share components
import {
  AppVectorIcons,
  BottomSheetComponent,
  ButtonComponent,
  HeadingSheetComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Navigation hooks
import {useTheme} from '@react-navigation/native';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Redux
import {useAppDispatch, useAppSelector} from '@/store';

// ** Slices
import {selectContactSupport} from '@/store/selectors';
import {setContactSupport} from '@/store/actions';

// ** Utilities
import {makePhoneCall} from '@utils';
import {hp} from '@utils/helpers';

const ContactSupportComponent = () => {
  const {status, callbackChat} = useAppSelector(selectContactSupport);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const toggleSheet = () => {
    dispatch(
      setContactSupport({
        status: 'closed',
        callbackChat: () => {},
      }),
    );
  };
  return status === 'open' ? (
    <BottomSheetComponent toggleSheet={toggleSheet}>
      <HeadingSheetComponent
        title="Consult with us"
        onCloseSheet={toggleSheet}
      />
      <View
        style={[
          spacing('padding').top,
          spacing('padding').horizontal,
          flex.gap10,
        ]}>
        <Image
          source={require('@assets/images/contact/contact-support.png')}
          style={{width: '100%', height: hp(15)}}
          resizeMode="contain"
        />
        {/* Text */}
        <View>
          <View style={[flex.alignItemsCenter, flex.gap4]}>
            <TextNormalComponent>
              Please choose a consultation method
            </TextNormalComponent>
            <TextNormalComponent fontWeight="500">
              (Completely free)
            </TextNormalComponent>
          </View>
        </View>
        {/* Button */}
        <View
          style={[
            flex.gap10,
            Platform.OS === 'ios'
              ? {
                  paddingBottom: insets.bottom,
                }
              : spacing('padding').bottom,
          ]}>
          <View style={[flex.flex1]}>
            <ButtonComponent
              rounded
              onPress={
                callbackChat
                  ? () => {
                      callbackChat();
                      toggleSheet();
                    }
                  : undefined
              }
              color="info"
              buttonStyle={[flex.row, flex.gap10, flex.alignItemsCenter]}>
              <AppVectorIcons
                type="Ionicons"
                name="chatbubble-ellipses-sharp"
                size={hp(2)}
                color={colors.primary}
              />
              <TextNormalComponent variant="primary">Chat</TextNormalComponent>
            </ButtonComponent>
          </View>
          <View style={[flex.flex1]}>
            <ButtonComponent
              rounded
              onPress={() => makePhoneCall('0333729180')}
              color="info"
              buttonStyle={[flex.row, flex.gap10, flex.alignItemsCenter]}>
              <AppVectorIcons
                type="Ionicons"
                name="call"
                size={hp(2)}
                color={colors.primary}
              />
              <TextNormalComponent variant="primary">
                Call us
              </TextNormalComponent>
            </ButtonComponent>
          </View>
        </View>
      </View>
    </BottomSheetComponent>
  ) : null;
};

export default memo(ContactSupportComponent);
