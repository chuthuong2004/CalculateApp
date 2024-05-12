import {
  clearAllMessageNotified,
  clearAllMessageReaction,
  removeMessageInConversation,
  removeMessageInReaction,
} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {StoreAccount, StoreMessage} from '@/types/entities';
import {getConversationUrl} from '@navigation/linking';
import {RootStackParamList} from '@navigation/types';
import notifee, {EventType} from '@notifee/react-native';
import {useLinkTo} from '@react-navigation/native';
import {ParamCreateMessage} from '@services/types';
import {useEffect} from 'react';

/**
 * @remarks
 * This hook will listen app foreground
 */
export function useForeground() {
  const dispatch = useAppDispatch();
  const linkTo = useLinkTo<RootStackParamList>();
  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      console.log({type, detail});
      let currentMessage =
        (detail.notification?.data?.message as StoreMessage) || null;
      const userReact =
        (detail.notification?.data?.userReact as StoreAccount) || null;
      switch (type) {
        case EventType.DISMISSED:
          console.log('USER [DISMISSED] NOTIFICATION:', detail.notification);
          if (currentMessage) {
            dispatch(
              removeMessageInConversation(currentMessage.conversation_id._id),
            );
            if (userReact) {
              dispatch(removeMessageInReaction(userReact._id));
            }
          } else {
            dispatch(clearAllMessageNotified());
            dispatch(clearAllMessageReaction());
          }

          break;
        case EventType.PRESS:
          console.log('USER [PRESSED] NOTIFICATION:', detail.notification);
          if (currentMessage) {
            console.log('cos mesage');

            dispatch(
              removeMessageInConversation(currentMessage.conversation_id._id),
            );
            if (userReact) {
              dispatch(removeMessageInReaction(userReact._id));
            }
            const url = getConversationUrl(currentMessage.conversation_id._id);
            console.log('UYR: ', url);

            linkTo(url);
            // setTimeout(() => {
            //   NavigationService.navigate('ChatStack', {
            //     screen: 'Message',
            //     params: {
            //       conversationId: currentMessage.conversation_id._id,
            //     },
            //   });
            // }, 600);
          }

          // await notifee.cancelNotification(detail.notification?.id || '');
          break;
        case EventType.ACTION_PRESS:
          if (detail.pressAction?.id === 'reply') {
            console.log(
              'USER [REPLY] NOTIFICATION:',
              detail.pressAction,
              detail.input,
            );
            const newMessage: ParamCreateMessage = {
              content: detail.input,
              conversation_id: currentMessage?.conversation_id._id || '',
            };
            console.log('newMessage: ', newMessage);

            // ** Handle send message
            // const createdMessaeg = await messageService.createMessage({
            //   content: detail.input,
            //   conversation_id: detail.notification?.data.message,
            // });
            // ** Handle add message to redux
            // dispatch(addMessageNotified(createdMessaeg));
          }
          if (detail.pressAction?.id === 'read-as-mark') {
            // TODO: Handle read as mark message
          }
          console.log('USER [ACTION PRESS] NOTIFICATION:', detail.pressAction);
          break;
        case EventType.DELIVERED:
          console.log('USER [DELIVERED] NOTIFICATION:', detail.notification);
          break;
        case EventType.APP_BLOCKED:
          console.log('USER [APP_BLOCKED] NOTIFICATION:', detail.notification);
          break;
        case EventType.CHANNEL_BLOCKED:
          console.log(
            'USER [CHANNEL_BLOCKED] NOTIFICATION:',
            detail.notification,
          );
          break;
        case EventType.CHANNEL_GROUP_BLOCKED:
          console.log(
            'USER [CHANNEL_GROUP_BLOCKED] NOTIFICATION:',
            detail.notification,
          );
          break;
        case EventType.TRIGGER_NOTIFICATION_CREATED:
          console.log(
            'USER [TRIGGER_NOTIFICATION_CREATED] NOTIFICATION:',
            detail.notification,
          );
          break;
        case EventType.UNKNOWN:
          console.log('USER [UNKNOWN] NOTIFICATION:', detail.notification);
          break;
      }
    });
  }, [dispatch, linkTo]);

  // useEffect(() => {
  //   (async () => {
  //     const sleep = (time: number) =>
  //       new Promise(resolve => setTimeout(() => resolve(), time));

  //     // You can do anything in your task such as network requests, timers and so on,
  //     // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  //     // React Native will go into "paused" mode (unless there are other tasks running,
  //     // or there is a foreground app).
  //     const veryIntensiveTask = async taskDataArguments => {
  //       // Example of an infinite loop task
  //       const {delay} = taskDataArguments;
  //       await new Promise(async () => {
  //         for (let i = 0; BackgroundService.isRunning(); i++) {
  //           // console.log(i, user);

  //           await sleep(delay);
  //         }
  //       });
  //     };

  //     const options = {
  //       taskName: 'Example',
  //       taskTitle: 'ExampleTask title',
  //       taskDesc: 'ExampleTask description',
  //       taskIcon: {
  //         name: 'ic_launcher',
  //         type: 'mipmap',
  //       },
  //       color: '#ff00ff',
  //       linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  //       parameters: {
  //         delay: 1000,
  //       },
  //     };
  //     BackgroundService.on('expiration', () => {
  //       console.log('I am being closed :(');
  //     });
  //     await BackgroundService.start(veryIntensiveTask, options);
  //     await BackgroundService.updateNotification({
  //       taskDesc: 'New ExampleTask description',
  //     }); // Only Android, iOS will ignore this call
  //     // iOS will also run everything here in the background until .stop() is called
  //     await BackgroundService.stop();
  //   })();
  // }, []);
}
