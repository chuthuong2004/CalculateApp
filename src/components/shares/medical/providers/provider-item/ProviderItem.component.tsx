import {View, Image, Pressable} from 'react-native';
import React, {memo} from 'react';
import {
  AnimatedIconHeartComponent,
  AppVectorIcons,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';
import {flex} from '@styles/flex.style';
import {ICON, COLORS} from '@utils/constants';
import {useToggle} from '@hooks/utils';
import {spacing} from '@styles/spacing.style';
import {StoreProvider} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import {hp} from '@utils/helpers';

type ProviderItemProps = {
  orientation?: 'horizontal' | 'vertical';
  provider: StoreProvider;
};
const ProviderItemComponent = ({
  orientation = 'vertical',
  provider,
}: ProviderItemProps) => {
  const {isOpen: isHearted, toggle} = useToggle(false);
  return (
    <CardComponent
      style={[
        orientation === 'vertical' ? flex.row : flex.column,
        orientation === 'vertical' ? flex.gap10 : flex.gap4,
      ]}>
      <Image
        source={{
          uri: provider.logo ? BASE_URL + provider.logo.path : undefined,
        }}
        width={hp(10)}
        height={orientation === 'vertical' ? hp(8) : hp(4)}
        resizeMode="contain"
      />
      <View
        style={[
          flex.gap4,
          flex.flex1,
          orientation === 'vertical' && spacing('padding', 0, 10).right,
        ]}>
        <TextNormalComponent>{provider?.company_name}</TextNormalComponent>
        <View
          style={[
            orientation === 'vertical' ? flex.column : flex.row,
            flex.justifyContentBetween,
            flex.gap4,
          ]}>
          <View style={[flex.row, flex.gap2]}>
            {new Array(provider?.star).fill(provider?.star).map((_, index) => (
              <AppVectorIcons
                key={index}
                type="AntDesign"
                name={ICON.AntDesign.star}
                size={hp(1.6)}
                color={COLORS.rating}
              />
            ))}
          </View>
          <TextNormalComponent>2km</TextNormalComponent>
        </View>
        {orientation === 'vertical' && (
          <TextNormalComponent size="sm" variant="secondary">
            {provider.provider_address?.specific},{' '}
            {provider.provider_address?.ward},{' '}
            {provider.provider_address?.district},{' '}
            {provider.provider_address?.province}
          </TextNormalComponent>
        )}
      </View>
      <Pressable
        onPress={toggle}
        style={{position: 'absolute', top: 2, right: 2}}>
        <AnimatedIconHeartComponent
          hearted={isHearted}
          outline
          containerStyle={{
            top: 0,
            right: 0,
          }}
          size="sm"
        />
      </Pressable>
    </CardComponent>
  );
};

export default memo(ProviderItemComponent);
