import {View, Pressable, PressableProps} from 'react-native';
import React, {ReactNode, memo, useMemo} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Share components
import {
  AppVectorIcons,
  AvatarComponent,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Types

// ** Global Styles
import {flex} from '@styles';

// ** Constants
import {APP_WIDTH, COLORS_APP} from '@utils/constants';
import {ChatStackScreenProps} from '@navigation/app/chat/types';
import {StoreConversation} from '@/types/entities';

// ** Redux
import {useAppSelector} from '@/store/index';

// ** Selectors
import {selectUser} from '@/store/selectors';

// ** Utilities
import {getFirstLetter, formatTimeLastMessage} from '@utils/utilities';

// ** Custom hooks
import {useListenReaction, useMessageTyping} from '@hooks';

// ** i18next
import {useTranslation} from 'react-i18next';
import {BASE_URL} from '@config/baseUrl';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {hp} from '@utils';

type ConversationItemProps = {
  conversation: StoreConversation;
  onLongPress?: (conversation: StoreConversation) => void;
  renderAccessory?: () => ReactNode;
} & Pick<PressableProps, 'onPress'>;
const ConversationItemComponent = ({
  conversation,
  onLongPress,
  onPress,
  renderAccessory,
}: ConversationItemProps) => {
  const {i18n} = useTranslation();
  const {user} = useAppSelector(selectUser);
  const {colors} = useTheme();
  const navigation =
    useNavigation<ChatStackScreenProps<'Conversation'>['navigation']>();

  // ** Listen message typing
  const {loadingMessage} = useMessageTyping(conversation._id);

  // ** Listen reaction message
  const reactionMessage = useListenReaction(conversation._id);
  const lastMessage = useMemo(() => {
    return conversation.last_message.find(
      item => item.user_id._id === user?._id,
    )?.message_id;
  }, [conversation.last_message, user?._id]);
  const renderAvatar = () => {
    if (conversation.type === 'group') {
      return (
        <View style={[flex.row, flex.wrap, {width: APP_WIDTH / 8}]}>
          {conversation.members.slice(0, 3).map(member => (
            <AvatarComponent
              source={
                member.avatar ? {uri: BASE_URL + member.avatar} : undefined
              }
              title={
                !member.avatar ? getFirstLetter(member.full_name) : undefined
              }
              rounded
              size={wp(1.6)}
              containerStyle={{backgroundColor: colors.primary}}
            />
          ))}
          <AvatarComponent
            title="+1"
            rounded
            size={'medium'}
            containerStyle={{backgroundColor: colors.primary}}
          />
        </View>
      );
    }
    const receiver = conversation.members.filter(
      member => member._id !== user?._id,
    )[0];
    console.log('RECEIVER: ', receiver.avatar);

    return (
      <AvatarComponent
        title={
          !receiver?.avatar ? getFirstLetter(receiver.full_name) : undefined
        }
        rounded
        size={hp(6)}
        status="online"
        renderAccessory={renderAccessory}
        fallback_color={receiver.fallback_color}
        source={
          receiver.avatar
            ? {
                uri: BASE_URL + receiver.avatar.path,
              }
            : undefined
        }
      />
    );
  };
  const renderTitleName = () => {
    if (conversation.type === 'group') {
      return (
        <View style={[flex.row, flex.gap4]}>
          <AppVectorIcons
            type="FontAwesome5"
            name="user-friends"
            size={hp(1.6)}
          />
          <TextNormalComponent fontWeight={isSeen ? '500' : 'bold'}>
            {conversation.name}
          </TextNormalComponent>
        </View>
      );
    }
    const receiver = conversation.members.filter(
      member => member._id !== user?._id,
    )[0];
    return (
      <TextNormalComponent size="md" fontWeight={isSeen ? '500' : '700'}>
        {receiver.full_name?.first + ' ' + receiver.full_name?.last}
      </TextNormalComponent>
    );
  };
  const renderLastMessage = () => {
    const isLoadingMessage =
      loadingMessage.length > 0 &&
      loadingMessage[loadingMessage.length - 1].conversationId ===
        conversation._id &&
      loadingMessage[loadingMessage.length - 1].loading &&
      loadingMessage[loadingMessage.length - 1].user_id._id !== user?._id;
    const renderTextContent = () => {
      if (isLoadingMessage) {
        return `${
          loadingMessage[loadingMessage.length - 1].user_id?.full_name?.last
        } đang nhập...`;
      }
      if (lastMessage?.images && lastMessage?.images.length > 0) {
        return `đã gửi ${lastMessage.images.length} hình ảnh`;
      }

      return lastMessage?.content;
    };
    const renderReactionMessage = () => {
      const newestReaction =
        reactionMessage?.reactions[reactionMessage?.reactions.length - 1];
      const text = `${newestReaction?.user_id.full_name.last} đã ${newestReaction?.type} tin nhắn "${reactionMessage?.content}" của bạn`;
      return (
        <TextNormalComponent
          size="sm"
          fontWeight={isSeen ? '500' : '700'}
          translate={false}>
          {text}
        </TextNormalComponent>
      );
    };
    return (
      <View style={[flex.flex1, flex.row, flex.alignItemsCenter]}>
        {reactionMessage ? (
          renderReactionMessage()
        ) : (
          <>
            {!isLoadingMessage && (
              <View style={[flex.row, flex.alignItemsCenter, flex.gap2]}>
                <TextNormalComponent
                  size="sm"
                  fontWeight={isSeen ? '500' : '700'}
                  translate={false}>
                  {lastMessage?.user_id?._id === user?._id
                    ? ''
                    : `${lastMessage?.user_id?.full_name?.last}`}
                </TextNormalComponent>
                {lastMessage?.user_id?._id !== user?._id && (
                  <TextNormalComponent translate={false}>
                    :{' '}
                  </TextNormalComponent>
                )}
              </View>
            )}
            <TextNormalComponent
              size="sm"
              ellipsizeMode="tail"
              fontWeight={isSeen ? undefined : '700'}
              style={[flex.flex1]}
              numberOfLines={1}>
              {renderTextContent()}
            </TextNormalComponent>
          </>
        )}
      </View>
    );
  };
  console.log('LASTMESSAGE: ', lastMessage);

  const isSeen = useMemo(() => {
    if (!lastMessage) {
      return true;
    }
    const users = lastMessage
      ? lastMessage.user_read?.filter(
          item => String(item.user_id) === user?._id,
        )
      : [];
    const isOwnMessage = lastMessage?.user_id?._id === user?._id;
    if (isOwnMessage) {
      return true;
    }
    return users?.length > 0 ? true : false;
  }, [lastMessage, user?._id]);

  return (
    <Pressable
      onPress={
        onPress
          ? onPress
          : () =>
              navigation.navigate('Message', {conversationId: conversation._id})
      }
      onLongPress={() => onLongPress && onLongPress(conversation)}>
      <CardComponent style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
        {renderAvatar()}
        <View style={[flex.flex1, flex.gap4]}>
          <View
            style={[
              flex.gap4,
              flex.row,
              flex.justifyContentBetween,
              flex.alignItemsCenter,
            ]}>
            {renderTitleName()}
            <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
              <View>
                <AppVectorIcons
                  type="FontAwesome"
                  name="bell-slash"
                  size={hp(1.1)}
                  color={isSeen ? COLORS_APP.secondary : colors.text}
                />
              </View>
              {lastMessage && (
                <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
                  {lastMessage.user_id?._id === user?._id && (
                    <AppVectorIcons
                      type="Ionicons"
                      name={
                        lastMessage.user_read.length > 0
                          ? 'checkmark-done-outline'
                          : 'checkmark-outline'
                      } // checkmark-done-outline | checkmark-outline
                      size={hp(1.6)}
                      color={isSeen ? COLORS_APP.secondary : colors.text}
                    />
                  )}
                  <TextNormalComponent
                    size="sm"
                    variant={isSeen ? 'secondary' : undefined}
                    translate={false}>
                    {formatTimeLastMessage(
                      new Date(lastMessage.createdAt),
                      i18n.language,
                    )}
                  </TextNormalComponent>
                </View>
              )}
            </View>
          </View>
          <View style={[flex.row, flex.gap10]}>
            {lastMessage ? (
              renderLastMessage()
            ) : (
              <View style={[flex.flex1]}>
                <TextNormalComponent
                  size="sm"
                  ellipsizeMode="tail"
                  style={[flex.flex1]}
                  numberOfLines={1}>
                  Nhấn vào để bắt đầu cuộc trò chuyện
                </TextNormalComponent>
              </View>
            )}
            {conversation.user_pins.find(p => p.user_id === user?._id) ? (
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: COLORS_APP.secondary,
                  padding: 4,
                }}>
                <AppVectorIcons
                  type="Entypo"
                  name="pin"
                  size={12}
                  color={isSeen ? COLORS_APP.secondary : colors.text}
                />
              </View>
            ) : null}
          </View>
        </View>
      </CardComponent>
    </Pressable>
  );
};

export default memo(ConversationItemComponent);
