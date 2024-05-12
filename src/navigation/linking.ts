import {OrderStatus} from '@/types/unions';
import {RootStackParamList} from '@navigation/types';
import {LinkingOptions} from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['medical://', 'https://sgod.vn'],
  config: {
    screens: {
      Acl: {
        path: 'acl',
      },
      App: {
        path: 'app',
        screens: {
          AccountStack: {
            path: 'account-stack',
            screens: {},
          },
          HomeStack: {
            path: 'home-stack',
            screens: {
              Notification: 'notifications',
              CartStack: {
                path: 'cart-stack',
                screens: {
                  Cart: '',
                  Checkout: 'checkout',
                  OrderManagementStack: 'orders',
                },
              },
              OrderManagementStack: {
                path: 'orders',
                screens: {
                  OrderDetails: {
                    path: 'order-details/:orderId/:orderStatus',
                  },
                },
              },
            },
          },
          ChatStack: {
            path: 'chat',
            screens: {
              Conversation: 'conversation',
              Message: {
                path: 'message/:conversationId',
              },
              CreateChat: 'create-chat',
              GroupChat: 'group-chat',
              ForwardMessage: 'forward-message',
            },
          },
          MedicalStack: {
            path: 'medical-stack',
            screens: {
              FormMedicine: 'form-medicine',
              Medicine: 'medicine',
            },
          },
          QRCodeStack: {
            path: 'qrcode-stack',
          },
        },
      },
      Auth: {
        path: 'auth',
      },
      Onboarding: {
        path: 'onboarding',
      },
      Splash: {
        path: 'splash',
      },
      ChooseLanguage: {
        path: 'choose-language',
      },
      ChooseTheme: {
        path: 'choose-theme',
      },
    },
  },
  enabled: true,
};

export const getConversationUrl = (conversationId: string) =>
  `/app/chat/message/${conversationId}`;

export const getOrderDetailUrl = (
  orderId: string,
  orderStatus: OrderStatus | 'imported',
) => `/app/home/orders/order-detail/${orderId}/${orderStatus}`;
