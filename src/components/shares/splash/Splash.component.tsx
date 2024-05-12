import {View} from 'react-native';
import React, {useEffect} from 'react';

// ** Lottie Icons
import AnimatedLottieView from 'lottie-react-native';

// ** Global Styles
import {flex} from '@styles';
import {useAuth} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from '@navigation/types';
import {useAppSelector} from '@/store';
import {selectIsFirst, selectUser} from '@/store/selectors';

const SplashComponent = ({}) => {
  const {initAuth} = useAuth();
  const navigation =
    useNavigation<RootStackScreenProps<'Splash'>['navigation']>();
  const {loadingApp, user} = useAppSelector(selectUser);
  const isFirst = useAppSelector(selectIsFirst);
  useEffect(() => {
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!loadingApp) {
      if (isFirst) {
        navigation.navigate(user ? 'App' : 'Auth');
      } else {
        navigation.navigate('Onboarding');
      }
    }
  }, [loadingApp, isFirst, navigation, user]);
  return (
    <View
      style={[flex.flex1, flex.alignItemsCenter, flex.justifyContentCenter]}>
      <AnimatedLottieView
        source={require('@assets/lottie/waveLoading.json')}
        autoPlay
        loop={true}
        resizeMode="cover"
      />
      <View
        style={[flex.alignItemsCenter, flex.full, flex.justifyContentCenter]}>
        <AnimatedLottieView
          source={require('@assets/lottie/doctors/doctor.icon.json')}
          autoPlay
          loop={false}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashComponent;
