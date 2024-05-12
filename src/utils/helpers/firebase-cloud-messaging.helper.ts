// import {StoreMessage} from '@/types/entities';
// import {BASE_URL} from '@config/baseUrl';
// import notifee, {
//   AndroidBadgeIconType,
//   AndroidColor,
//   AndroidGroupAlertBehavior,
//   AndroidImportance,
//   AndroidInboxStyle,
//   AndroidMessagingStyle,
//   AndroidStyle,
//   EventType,
//   Notification,
// } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import {firebaseService} from '@services/firebase';
// import {STORAGE_KEY} from '@utils/constants';
// import {save} from '@utils/storage';
// import {AppState} from 'react-native';
// import {PERMISSIONS, request} from 'react-native-permissions';
//method was called to get FCM tiken for notification
// export const getFcmToken = async () => {
//   let token = null;
//   await checkApplicationNotificationPermission();
//   await registerAppWithFCM();
//   try {
//     token = await messaging().getToken();
//     console.log('getFcmToken-->', token);
//     if (token) {
//       const saveToken = await firebaseService.saveToken(token);
//       console.log('savedToken: ', saveToken);
//     }
//   } catch (error) {
//     console.log('getFcmToken Device Token error ', error);
//   }
//   return token;
// };

//method was called on  user register with firebase FCM for notification
// export async function registerAppWithFCM() {
//   console.log(
//     'registerAppWithFCM status',
//     messaging().isDeviceRegisteredForRemoteMessages,
//   );
//   if (!messaging().isDeviceRegisteredForRemoteMessages) {
//     await messaging()
//       .registerDeviceForRemoteMessages()
//       .then(status => {
//         console.log('registerDeviceForRemoteMessages status', status);
//       })
//       .catch(error => {
//         console.log('registerDeviceForRemoteMessages error ', error);
//       });
//   }
// }

//method was called on un register the user from firebase for stoping receiving notifications
// export async function unRegisterAppWithFCM() {
//   console.log(
//     'unRegisterAppWithFCM status',
//     messaging().isDeviceRegisteredForRemoteMessages,
//   );

//   if (messaging().isDeviceRegisteredForRemoteMessages) {
//     await messaging()
//       .unregisterDeviceForRemoteMessages()
//       .then(status => {
//         console.log('unregisterDeviceForRemoteMessages status', status);
//       })
//       .catch(error => {
//         console.log('unregisterDeviceForRemoteMessages error ', error);
//       });
//   }
//   await messaging().deleteToken();
//   console.log(
//     'unRegisterAppWithFCM status',
//     messaging().isDeviceRegisteredForRemoteMessages,
//   );
// }

// export const checkApplicationNotificationPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
//   request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
//     .then(result => {
//       console.log('POST_NOTIFICATIONS status:', result);
//     })
//     .catch(error => {
//       console.log('POST_NOTIFICATIONS error ', error);
//     });
// };

//method was called to listener events from firebase for notification triger
// export function registerListenerWithFCM() {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log(
//       'FIREBASE NOTIFICATION Received : ',
//       JSON.stringify(remoteMessage),
//     );
//     const isForeground = AppState.currentState.includes('active');
//     console.log('isForeground: ', isForeground);

//     if (
//       remoteMessage?.notification?.title &&
//       remoteMessage?.notification?.body &&
//       !isForeground
//     ) {
//       console.log('VOOOOOOO');

//       onDisplayNotificationMessage(
//         JSON.parse(remoteMessage.data.data) as StoreMessage,
//       );
//       // onDisplayNotification(
//       //   remoteMessage.notification?.title,
//       //   remoteMessage.notification?.body,
//       //   remoteMessage?.data,
//       // );
//     }
//   });

//   return unsubscribe;
// }

//method was called to display notification
// async function onDisplayNotification(
//   title: string,
//   body: string,
//   data: Notification['data'],
// ) {
//   console.log('onDisplayNotification Adnan: ', JSON.stringify(data));

//   // Request permissions (required for iOS)
//   await notifee.requestPermission();
//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title: title,
//     body: body,
//     data: data,
//     android: {
//       channelId,
//       // pressAction is needed if you want the notification to open the app when pressed
//       pressAction: {
//         id: 'default',
//       },
//     },
//   });
// }

// export async function onDisplayNotificationMessage(message: StoreMessage) {
//   // Request permissions (required for iOS)
//   await notifee.requestPermission();
//   await notifee.deleteChannel(message.conversation_id._id);

//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: message.conversation_id._id,
//     name: 'Message Channel',
//     sound: 'thongbao',

//     vibration: true,
//     vibrationPattern: [300, 500],

//     lights: true,
//     lightColor: AndroidColor.RED,
//     importance: AndroidImportance.HIGH,
//   });

//   // For IOS
//   await notifee.setNotificationCategories([
//     {
//       id: message.conversation_id._id,
//       allowAnnouncement: true,

//       hiddenPreviewsShowTitle: true,
//       summaryFormat: 'You have %u+ unread messages from %@.',
//       actions: [
//         {
//           id: 'reply',
//           title: 'Reply',
//           destructive: true,
//           // Only show if device is unlocked
//           authenticationRequired: true,
//           // input: true,
//           input: {
//             placeholderText: 'Send a message...' || '',
//             buttonText: 'Send now' || '',
//           },
//         },
//         {
//           id: 'mark-as-read',
//           title: 'Mark as read',
//         },
//       ],
//     },
//   ]);
//   try {
//     const INBOX: AndroidInboxStyle = {
//       type: AndroidStyle.INBOX,

//       lines: [message].map(mess => mess.content),
//     };
//     const GROUP: AndroidMessagingStyle = {
//       type: AndroidStyle.MESSAGING,
//       person: {
//         name:
//           message.user_id.full_name.first +
//           ' ' +
//           message.user_id.full_name.last,
//         id: message.user_id._id,
//         icon: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/338389604_885119739454460_3394782972809124870_n.jpg?stp=cp6_dst-jpg_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE4xKdOsAhQw4Bv2BSbPNhBZam-3ZR11TRlqb7dlHXVNHNZZFwM8KmcUj4MBAhSKWCS56uYfneBhwzlnw1cQm99&_nc_ohc=hF9S7NbFQBQAX-oDXCA&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBAlW6_JEiaPH7vL7uPXCulYAszDiSmzxBG_G9-fHysrw&oe=660A8730',
//       },
//       group: true,
//       title: message.conversation_id.name,
//       messages: [message].map(mess => ({
//         text: mess.content,
//         timestamp: new Date(mess.createdAt).getTime(),

//         person: {
//           name:
//             mess.user_id.full_name.first + ' ' + mess.user_id.full_name.last,
//           important: true,
//         },
//       })),
//     };
//     // Display a notification
//     await notifee.displayNotification({
//       title:
//         message.conversation_id.type === 'group'
//           ? message.conversation_id.name
//           : message.user_id.full_name.first +
//             ' ' +
//             message.user_id.full_name.last,
//       subtitle: 'Tin nhắn mới',
//       body: message.content,
//       data: {
//         message,
//       },
//       android: {
//         channelId,
//         // groupSummary: true,
//         groupId: message.conversation_id._id,
//         groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
//         showTimestamp: true,
//         lights: [AndroidColor.RED, 300, 600],
//         importance: AndroidImportance.HIGH,
//         // largeIcon:
//         //   'https://assetadmin.sgod.vn/images/avatars/1700473163502-731282463-IMG_0050.JPG.jpg',
//         badgeIconType: AndroidBadgeIconType.LARGE,
//         pressAction: {
//           id: 'default',
//           launchActivity: 'default',
//         },
//         // showChronometer: true,
//         color: '#777777',
//         //   style: {
//         //     type: AndroidStyle.BIGTEXT,
//         //     text: 'Xin chào lorem10sdmf bsdfm sbfdmsbsj hsjhdf sjdfsvdfj svfjsdbfv sjkdf skdfsdf jksdfjsdfvsjdf vsdjfsvdf jsvdfjs dfksdf skdfvbs dkjfvdsj vsdfjsdvf jsdvfskd fskdf jsdkfbsdkf bsdfkbs dksbdf ksdbfsdkfb sdf ksbd',
//         //     summary:
//         //       'Summary skdf skdfbs kfsbdkfsh bhkfsdbf skdfbsd fksdfbskdb fskdbf skdfbsdk bfsdkf bsdkfb sdkfbsd kjsdb ksdbfskdb fskdjfb skdjfbsdk bskf bsdkfbsd kfsdkf sdfksdfb sd',
//         //     title:
//         //       'Title smdbf skdfb sdkbfsk bsdkfjbs dkbskfb sdkfsbdfks bfksdbf ksdbfskdbfskd sdjbf skdfbskdb skdbfskjbdfk jsbfksdbf ksbksbdvksb kvjsbd kcskj sbksdb ksdfbskdb skdfbskdb fskdf sbd',
//         //   },
//         //   style: {
//         //     type: AndroidStyle.BIGPICTURE,
//         //     picture: 'https://my-cdn.com/user/123/upload/456.png',
//         //   },
//         style: message.conversation_id.type === 'private' ? INBOX : GROUP,

//         timestamp: new Date(message.createdAt).getTime(), // 8 minutes ago
//         actions: [
//           {
//             title: 'Reply',
//             pressAction: {id: 'reply'},
//             // input: true, // enable free text input
//             input: {
//               allowFreeFormInput: true, // set to false
//               // choices: ['Yes', 'No', 'Maybe'],
//               placeholder: 'Reply to Sarah...',
//               // allowGeneratedReplies: true,
//               // editableChoices: true,
//             },
//           },
//           {
//             title: 'Mark as read',
//             pressAction: {id: 'mark-as-read'},
//           },
//         ],
//       },
//       ios: {
//         attachments:
//           message.images && message.images.length > 0
//             ? message.images.map(img => ({
//                 url: BASE_URL + img.path,
//               }))
//             : [],
//         foregroundPresentationOptions: {
//           badge: true,
//           sound: true,
//           banner: true,
//           list: true,
//         },
//         categoryId: message.conversation_id._id,
//         summaryArgument:
//           message.conversation_id.type === 'private'
//             ? message.user_id.full_name.first +
//               ' ' +
//               message.user_id.full_name.last
//             : message.conversation_id.name,
//         summaryArgumentCount: 5,
//       },
//     });
//   } catch (error) {
//     console.log('erros: ', error);
//   }
// }
