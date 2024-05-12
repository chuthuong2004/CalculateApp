import {StoreNotification} from '@/types/entities';
import notifee, {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';
import {useCallback} from 'react';

/**
 * This hook to display notification
 * @returns {Object} The object contain callback
 * @property {function} displayNotification This function handle display notification
 */
export function useNotifeeNotification() {
  const displayNotification = useCallback(async function onDisplayNotification(
    notification: StoreNotification,
  ) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    await notifee.deleteChannel(notification._id);

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: notification._id,
      name: 'Notify Channel',
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
        id: 'ORDER',
        allowAnnouncement: true,

        hiddenPreviewsShowTitle: true,
        summaryFormat: 'You have %u+ notifications from %@.',
      },
    ]);
    try {
      // Display a notification
      await notifee.displayNotification({
        title: 'Có thông báo đơn hàng mới !',
        subtitle: 'Van Thuong Dao vừa đặt mua 5 sản phẩm  !',
        body: 'Chi tiết thông báo',
        data: {},
        android: {
          channelId,
          // groupSummary: true,
          groupId: notification._id,
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
          // showChronometer: true,
          color: '#777777',
          style: {
            type: AndroidStyle.BIGTEXT,
            text: 'Xin chào lorem10sdmf bsdfm sbfdmsbsj hsjhdf sjdfsvdfj svfjsdbfv sjkdf skdfsdf jksdfjsdfvsjdf vsdjfsvdf jsvdfjs dfksdf skdfvbs dkjfvdsj vsdfjsdvf jsdvfskd fskdf jsdkfbsdkf bsdfkbs dksbdf ksdbfsdkfb sdf ksbd',
            summary:
              'Summary skdf skdfbs kfsbdkfsh bhkfsdbf skdfbsd fksdfbskdb fskdbf skdfbsdk bfsdkf bsdkfb sdkfbsd kjsdb ksdbfskdb fskdjfb skdjfbsdk bskf bsdkfbsd kfsdkf sdfksdfb sd',
            title:
              'Title smdbf skdfb sdkbfsk bsdkfjbs dkbskfb sdkfsbdfks bfksdbf ksdbfskdbfskd sdjbf skdfbskdb skdbfskjbdfk jsbfksdbf ksbksbdvksb kvjsbd kcskj sbksdb ksdfbskdb skdfbskdb fskdf sbd',
          },
          // style: {
          //   type: AndroidStyle.BIGPICTURE,
          //   picture: 'https://my-cdn.com/user/123/upload/456.png',
          // },

          timestamp: new Date(notification.createdAt).getTime(), // 8 minutes ago
        },
        ios: {
          attachments: [
            // {
            //   // Remote image
            //   url: 'https://my-cdn.com/images/123456.png',
            // },
          ],
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          categoryId: 'ORDER',
          summaryArgument: 'Buòn quá',
          summaryArgumentCount: 5,
        },
      });
    } catch (error) {
      console.log('erros: ', error);
    }
  },
  []);
  return {displayNotification};
}
