import {View} from 'react-native';
import React from 'react';
import {flex} from '@styles';
import {AvatarComponent} from '@components/shares/avatar';
import {TextNormalComponent} from '@components/shares/text';
import {AppVectorIcons} from '@components/shares/icons';
import {COLORS_APP} from '@utils/constants';
import {CardComponent} from '@components/shares/cards';
import {hp} from '@utils/helpers';

const CustomerItemComponent = () => {
  return (
    <CardComponent shadow style={[flex.row, flex.gap10]}>
      <AvatarComponent
        source={{
          uri: 'https://assetadmin.sgod.vn/images/avatars/1696906279522-584445545-Screenshot_20230802-071513_Facebook.jpg',
        }}
        size="medium"
        rounded
      />
      <View style={[flex.flex1, flex.gap4]}>
        <View
          style={[flex.row, flex.alignItemsCenter, flex.justifyContentBetween]}>
          <TextNormalComponent fontWeight="500">
            Ngô Việt Trì
          </TextNormalComponent>
        </View>
        <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
          <AppVectorIcons
            type="FontAwesome"
            name="hospital-o"
            size={hp(1.8)}
            color={COLORS_APP.secondary}
          />
          <TextNormalComponent variant="secondary">
            Bệnh Viện Xuyên Á
          </TextNormalComponent>
        </View>
        <View
          style={[flex.row, flex.justifyContentBetween, flex.alignItemsCenter]}>
          <View style={[flex.row, flex.gap4]}>
            <TextNormalComponent size="sm" variant="secondary">
              Đã nhập
            </TextNormalComponent>
            <TextNormalComponent size="sm" fontWeight="500">
              500.000.000đ
            </TextNormalComponent>
          </View>
        </View>
      </View>
    </CardComponent>
  );
};

export default CustomerItemComponent;
