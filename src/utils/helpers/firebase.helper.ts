// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// export async function checkApplicationPermission() {
//   const authorizationStatus = await messaging().requestPermission();

//   if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
//     console.log('User has notification permissions enabled.');
//   } else if (
//     authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
//   ) {
//     console.log('User has provisional notification permissions.');
//   } else {
//     console.log('User has notification permissions disabled');
//   }
// }

// export async function onAppBootstrap() {
//   // Register the device with FCM
//   await messaging().registerDeviceForRemoteMessages();

//   // Get the token
//   const token = await messaging().getToken();

//   // Save the token
//   console.log('TOKEN FIREBASE: ', token);

//   //   await postToApi('/users/1234/tokens', {token});
// }

// export async function saveTokenToDatabase(token: string) {
//   // Assume user is already signed in
//   console.log('Saving token to database: ', token);
// }
