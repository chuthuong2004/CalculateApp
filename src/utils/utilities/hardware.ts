import {Platform, Linking, Alert} from 'react-native';

export function makePhoneCall(phone: string) {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
}
export function makeSMS(phone: string) {
  console.log('callNumber ----> ', phone);
  let phoneNumber = `sms:${phone}`;
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
}

export function linkToMail(email: string) {
  console.log(email);

  Linking.canOpenURL(`mailto:${email}`)
    .then(supported => {
      if (!supported) {
        Alert.alert('Navigate to email not support !');
      } else {
        return Linking.openURL(`mailto:${email}`);
      }
    })
    .catch(err => console.log(err));
}
