// import {
//   removeMessageInConversation,
//   removeMessageInReaction,
// } from '@/store/actions';
// import {AppDispatch} from '@/store/index';
// import {StoreAccount, StoreMessage} from '@/types/entities';
import notifee from '@notifee/react-native';
// export async function deleteDisplayedNotificationByConversation(
//   conversation_id: string,
//   dispatch: AppDispatch,
// ) {
//   const notifications = await notifee.getDisplayedNotifications();
//   const notificationsInConversation = notifications.filter(notification => {
//     const messageInConversation = notification.notification.data
//       ?.message as StoreMessage;
//     if (messageInConversation) {
//       return messageInConversation.conversation_id._id === conversation_id;
//     }
//     return false;
//   });
//   await Promise.all([
//     notifee.deleteChannel(conversation_id),
//     notifee.cancelDisplayedNotifications(
//       notificationsInConversation.map(item => item.notification.id || ''),
//     ),
//   ]);
//   dispatch(removeMessageInConversation(conversation_id));
// }
// export async function deleteDisplayedNotificationByReaction(
//   conversation_id: string,
//   dispatch: AppDispatch,
// ) {
//   const notifications = await notifee.getDisplayedNotifications();
//   const notificationsInConversation = notifications.filter(notification => {
//     const messageInConversation = notification.notification.data
//       ?.message as StoreMessage;
//     const userReact = notification.notification.data?.userReact as StoreAccount;
//     if (messageInConversation && userReact) {
//       return messageInConversation.conversation_id._id === conversation_id;
//     }
//     return false;
//   });
//   await Promise.all([
//     notificationsInConversation.map(item => {
//       const userReact = item.notification.data?.userReact as StoreMessage;
//       if (!userReact) {
//         return null;
//       }

//       dispatch(removeMessageInReaction(userReact._id));
//       return notifee.deleteChannel(userReact._id);
//     }),
//     notifee.cancelDisplayedNotifications(
//       notificationsInConversation.map(item => item.notification.id || ''),
//     ),
//   ]);
// }
