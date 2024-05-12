import {useEffect} from 'react';
import notifee, {EventType} from '@notifee/react-native';
import {NavigationService} from '@utils/background-service';
import {StoreMessage} from '@/types/entities';
import {ParamCreateMessage} from '@services/types';
import {
  clearAllMessageNotified,
  removeMessageInConversation,
} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
/**
 * @remarks This hook will listen event background;
 */
export function useBackground() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log({type, detail});
      let currentMessage =
        (detail.notification?.data?.message as StoreMessage) || null;

      switch (type) {
        case EventType.DISMISSED:
          console.log('USER [DISMISSED] NOTIFICATION:', detail.notification);
          if (currentMessage) {
            dispatch(
              removeMessageInConversation(currentMessage.conversation_id._id),
            );
          } else {
            dispatch(clearAllMessageNotified());
          }

          break;
        case EventType.PRESS:
          console.log('USER [PRESSED] NOTIFICATION:', detail.notification);
          if (currentMessage) {
            dispatch(
              removeMessageInConversation(currentMessage.conversation_id._id),
            );
            setTimeout(() => {
              NavigationService.navigate('ChatStack', {
                screen: 'Message',
                params: {
                  conversationId: currentMessage.conversation_id._id,
                },
              });
            }, 600);
          }

          await notifee.cancelNotification(detail.notification?.id || '');
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
          console.log('USER [DELIVERED] NOTIFICATION BG:', detail.notification);
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
  }, [dispatch]);
}
