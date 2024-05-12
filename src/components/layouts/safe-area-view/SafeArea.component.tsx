import {View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const SafeAreaComponent = () => {
  const {dark} = useTheme();
  return (
    <View style={{height: StatusBar.currentHeight}}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={dark ? 'dark-content' : 'light-content'}
          hidden={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default SafeAreaComponent;
