import {useAppSelector} from '@/store/index';
import {
  selectMessagesNotified,
  selectReactionNotified,
  selectUser,
} from '@/store/selectors';
import {StoreMessage} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import notifee, {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidInboxStyle,
  AndroidMessagingStyle,
  AndroidStyle,
} from '@notifee/react-native';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

/**
 * This hook to display notification
 * @returns {Object} The object contain callback
 * @property {function} displayNotification This function handle display notification
 */
export function useNotifeeMessage() {
  const {t} = useTranslation();
  const {user} = useAppSelector(selectUser);
  const messagesNotified = useAppSelector(selectMessagesNotified);
  const reactionNotified = useAppSelector(selectReactionNotified);

  const displayNotification = useCallback(
    async function onDisplayNotification(message: StoreMessage) {
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      await notifee.deleteChannel(message.conversation_id._id);

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: message.conversation_id._id,
        name: 'Message Channel',
        sound: 'thongbao',

        vibration: true,
        vibrationPattern: [300, 500],

        lights: true,
        lightColor: AndroidColor.RED,
        importance: AndroidImportance.HIGH,
      });

      // For IOS
      await notifee.setNotificationCategories([
        {
          id: message.conversation_id._id,
          allowAnnouncement: true,

          hiddenPreviewsShowTitle: true,
          summaryFormat: 'You have %u+ unread messages from %@.',
          actions: [
            {
              id: 'reply',
              title: t('Reply'),
              destructive: true,
              // Only show if device is unlocked
              authenticationRequired: true,
              // input: true,
              input: {
                placeholderText: t('Send a message...') || '',
                buttonText: t('Send now') || '',
              },
            },
            {
              id: 'mark-as-read',
              title: t('Mark as read'),
            },
          ],
        },
      ]);
      try {
        const messageInConversation = messagesNotified
          ? messagesNotified[message.conversation_id._id]
            ? messagesNotified[message.conversation_id._id]
            : []
          : [];

        const INBOX: AndroidInboxStyle = {
          type: AndroidStyle.INBOX,

          lines: [...messageInConversation, message].map(mess => mess.content),
        };
        const GROUP: AndroidMessagingStyle = {
          type: AndroidStyle.MESSAGING,
          person: {
            name:
              user?.account_id.full_name.first +
              ' ' +
              user?.account_id.full_name.last,
            id: user?.account_id._id,
            icon: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/338389604_885119739454460_3394782972809124870_n.jpg?stp=cp6_dst-jpg_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE4xKdOsAhQw4Bv2BSbPNhBZam-3ZR11TRlqb7dlHXVNHNZZFwM8KmcUj4MBAhSKWCS56uYfneBhwzlnw1cQm99&_nc_ohc=hF9S7NbFQBQAX-oDXCA&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBAlW6_JEiaPH7vL7uPXCulYAszDiSmzxBG_G9-fHysrw&oe=660A8730',
          },
          group: true,
          title: message.conversation_id.name,
          messages: [...messageInConversation, message].map(mess => ({
            text: mess.content,
            timestamp: new Date(mess.createdAt).getTime(),

            person: {
              name:
                mess.user_id.full_name.first +
                ' ' +
                mess.user_id.full_name.last,
              important: true,
            },
          })),
        };
        // Display a notification
        console.log('Vô cuối');

        await notifee.displayNotification({
          title:
            message.conversation_id.type === 'group'
              ? message.conversation_id.name
              : message.user_id.full_name.first +
                ' ' +
                message.user_id.full_name.last,
          subtitle: 'Tin nhắn mới',
          body: message.content,
          data: {
            message,
          },
          android: {
            channelId,
            // groupSummary: true,
            groupId: message.conversation_id._id,
            groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
            showTimestamp: true,
            lights: [AndroidColor.RED, 300, 600],
            importance: AndroidImportance.HIGH,
            // largeIcon:
            //   'https://assetadmin.sgod.vn/images/avatars/1700473163502-731282463-IMG_0050.JPG.jpg',
            badgeIconType: AndroidBadgeIconType.SMALL,
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
            // showChronometer: true,
            color: '#777777',
            //   style: {
            //     type: AndroidStyle.BIGTEXT,
            //     text: 'Xin chào lorem10sdmf bsdfm sbfdmsbsj hsjhdf sjdfsvdfj svfjsdbfv sjkdf skdfsdf jksdfjsdfvsjdf vsdjfsvdf jsvdfjs dfksdf skdfvbs dkjfvdsj vsdfjsdvf jsdvfskd fskdf jsdkfbsdkf bsdfkbs dksbdf ksdbfsdkfb sdf ksbd',
            //     summary:
            //       'Summary skdf skdfbs kfsbdkfsh bhkfsdbf skdfbsd fksdfbskdb fskdbf skdfbsdk bfsdkf bsdkfb sdkfbsd kjsdb ksdbfskdb fskdjfb skdjfbsdk bskf bsdkfbsd kfsdkf sdfksdfb sd',
            //     title:
            //       'Title smdbf skdfb sdkbfsk bsdkfjbs dkbskfb sdkfsbdfks bfksdbf ksdbfskdbfskd sdjbf skdfbskdb skdbfskjbdfk jsbfksdbf ksbksbdvksb kvjsbd kcskj sbksdb ksdfbskdb skdfbskdb fskdf sbd',
            //   },
            //   style: {
            //     type: AndroidStyle.BIGPICTURE,
            //     picture: 'https://my-cdn.com/user/123/upload/456.png',
            //   },
            style: message.conversation_id.type === 'private' ? INBOX : GROUP,

            timestamp: new Date(message.createdAt).getTime(), // 8 minutes ago
            actions: [
              {
                title: t('Reply'),
                pressAction: {id: 'reply'},
                // input: true, // enable free text input
                input: {
                  allowFreeFormInput: true, // set to false
                  // choices: ['Yes', 'No', 'Maybe'],
                  placeholder: 'Reply to Sarah...',
                  // allowGeneratedReplies: true,
                  // editableChoices: true,
                },
              },
              {
                title: t('Mark as read'),
                pressAction: {id: 'mark-as-read'},
              },
            ],
          },
          ios: {
            attachments:
              message.images && message.images.length > 0
                ? message.images.map(img => ({
                    url: BASE_URL + img.path,
                  }))
                : [],
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
            categoryId: message.conversation_id._id,
            summaryArgument:
              message.conversation_id.type === 'private'
                ? message.user_id.full_name.first +
                  ' ' +
                  message.user_id.full_name.last
                : message.conversation_id.name,
            summaryArgumentCount: 5,
          },
        });
      } catch (error) {
        console.log('erros: ', error);
      }
    },
    [t, messagesNotified, user],
  );
  const displayReactionNotification = useCallback(
    async (message: StoreMessage) => {
      const reaction = message.reactions[message.reactions.length - 1];
      const userReact = reaction.user_id;
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      await notifee.deleteChannel(userReact._id);

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: userReact._id,
        name: 'Reaction Channel',
        sound: 'thongbao',

        vibration: true,
        vibrationPattern: [300, 500],
        lights: true,
        lightColor: AndroidColor.RED,
        importance: AndroidImportance.HIGH,
      });
      try {
        console.log('REX: ', reactionNotified);

        const listMessageByUserReact = reactionNotified
          ? reactionNotified[userReact._id]
            ? reactionNotified[userReact._id]
            : []
          : [];
        console.log('listMessageByUserReact: ', listMessageByUserReact);

        // Display a notification
        await notifee.displayNotification({
          title: userReact.full_name.first + ' ' + userReact.full_name.last,
          body: `${reaction.type} với tin nhắn "${message.content}" của bạn`,
          data: {
            message,
            userReact,
          },
          android: {
            channelId,
            groupId: message.conversation_id._id,
            groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
            showTimestamp: true,
            lights: [AndroidColor.RED, 300, 600],
            importance: AndroidImportance.HIGH,
            largeIcon:
              'https://assetadmin.sgod.vn/images/avatars/1700473163502-731282463-IMG_0050.JPG.jpg',
            badgeIconType: AndroidBadgeIconType.SMALL,
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
            color: '#777777',
            timestamp: new Date(reaction?.createdAt || '').getTime(), // 8 minutes ago
            style: {
              type: AndroidStyle.INBOX,
              lines: [...listMessageByUserReact, message].map(mess => {
                const reactionType = mess.reactions[mess.reactions.length - 1];
                return `${reactionType.type} với tin nhắn "${mess.content}" của bạn`;
              }),
            },
          },
          ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
            summaryArgument:
              userReact.full_name.first + ' ' + userReact.full_name.last,
            summaryArgumentCount: 5,
          },
        });
      } catch (error) {
        console.log('erros: ', error);
      }
    },
    [reactionNotified],
  );
  return {displayNotification, displayReactionNotification};
}
