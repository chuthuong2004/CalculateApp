import {Image} from '@rneui/base';
import {flex} from '@styles/flex.style';
import {COLORS_APP} from '@utils/constants';
import {hp} from '@utils/helpers';
import React from 'react';
import {View} from 'react-native';
import {TextNormalComponent} from '../text';

const FileMessageComponent = () => {
  return (
    <View style={[flex.row, flex.gap10, flex.alignItemsCenter]}>
      <Image
        source={{
          uri: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/430958280_358726677158234_3671637939830259525_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&cb=99be929b-b574a898&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGfPQ4HGZ3_VO67DcHXfHFFucPo_lzsgHm5w-j-XOyAeV4iNH-KLXUzV1k2hSwWDkkQ53t5J7LsZV112jGy15LQ&_nc_ohc=pIciCADNgqsAX-8v2SD&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfBIudqIKcyCs3hWJB32kLE14dkcHX2qSD7QFASigymrfg&oe=65EAD02B',
        }}
        style={{width: hp(5), height: hp(5), borderRadius: hp(0.5)}}
      />
      <View style={[flex.gap4]}>
        <TextNormalComponent fontWeight="500">
          ksadfksdfsdfsdksfs-i27348=igy132.png
        </TextNormalComponent>
        <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
          <TextNormalComponent variant="secondary">15MB</TextNormalComponent>
          <View
            style={{
              width: 2,
              height: 2,
              borderRadius: 10,
              backgroundColor: COLORS_APP.secondary,
            }}
          />
          <TextNormalComponent variant="secondary">
            Sep 13,2023 at 04:26 PM
          </TextNormalComponent>
        </View>
      </View>
    </View>
  );
};

export default FileMessageComponent;
