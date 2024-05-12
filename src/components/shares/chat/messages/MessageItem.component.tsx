import {useNavigation, useTheme} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Pressable, StyleSheet, View, ViewProps} from 'react-native';

// ** Share components
import {
  AppVectorIcons,
  AvatarComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Global styles
import {flex, spacing} from '@styles';

// ** Types
import {Nullable, StyleSheetProps} from '@/types/commons';
import {StoreAccount, StoreMessage} from '@/types/entities';

// ** Constant
import {
  APP_WIDTH,
  COLORS_APP,
  HEIGHT_MESSAGE_LOADING,
  ICON,
} from '@utils/constants';

// ** Gesture handler
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// ** Reanimated
import Animated, {
  FadeInUp,
  FadeOutUp,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// ** Redux
import {useAppSelector} from '@/store';

// ** Selectors
import {selectUser} from '@/store/selectors';

// ** Moment JS
import moment from 'moment';

// ** Utilities
import {BASE_URL} from '@config/baseUrl';
import {getFirstLetter} from '@utils/utilities';

// ** Custom hooks
import {useMessage, useToggle} from '@hooks';
import {ChatStackScreenProps} from '@navigation/app/chat/types';
import {hp} from '@utils/helpers';
import {RenderImageMessageComponent} from './components';
import ListReactionIconComponent from './components/ListReactionIcon.component';

const TRANSLATE_X_THRESHOLD_OWNER = -APP_WIDTH * 0.3;
const TRANSLATE_X_THRESHOLD = APP_WIDTH * 0.3;
interface MessageItemProps extends ViewProps {
  message: StoreMessage;
  own?: boolean;
  isShowReaction: boolean;
  onReplyMessage: (message: StoreMessage) => void;
  onPressParentMessage: (message: StoreMessage) => void;
  onReactionMessage: (message: Nullable<StoreMessage>) => void;
  onResetReactionMessage: () => void;
}
const MessageItemComponent: React.FC<MessageItemProps> = ({
  own,
  message,
  isShowReaction,
  onReplyMessage,
  onPressParentMessage,
  onReactionMessage,
  onResetReactionMessage,
  ...passProps
}) => {
  const navigation =
    useNavigation<ChatStackScreenProps<'Message'>['navigation']>();
  // ** Selectors
  const {user} = useAppSelector(selectUser);
  const {colors, dark} = useTheme();

  // ** ======= Custom Hooks =======
  const {onReactMessage: handleReactMessage} = useMessage();
  const {isOpen: isToggle, toggle: toggleSeen} = useToggle(false);
  // ** States

  // ** ======= Refs ======
  const timeTapRef = useRef<null | number>(null);

  // ** Shared value reply message
  const translateX = useSharedValue(0);
  // ** Shared value react message
  const svReactMessage = useSharedValue(0);

  // ** Gesture handler
  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        if (
          (event.translationX < TRANSLATE_X_THRESHOLD_OWNER && own) ||
          (event.translationX > TRANSLATE_X_THRESHOLD && !own)
        ) {
          translateX.value = event.translationX;
        }
      },
      onEnd: () => {
        if (
          (translateX.value < TRANSLATE_X_THRESHOLD_OWNER && own) ||
          (translateX.value > TRANSLATE_X_THRESHOLD && !own)
        ) {
          translateX.value = withTiming(0, undefined, finished => {
            if (finished && onReplyMessage) {
              runOnJS(onReplyMessage)(message);
            }
          });
        }
      },
    });

  // ** ======= Side effects =========
  // Reply message
  useEffect(() => {
    svReactMessage.value = withTiming(isShowReaction ? 1 : 0, {duration: 300});
  }, [isShowReaction, svReactMessage, message._id]);

  // ** ======= Callbacks ========
  // Handle long press => show reaction message
  const handleLongPressMessage = useCallback(() => {
    if (!isShowReaction) {
      onReactionMessage(message);
    } else {
      onResetReactionMessage();
    }
  }, [isShowReaction, onResetReactionMessage, onReactionMessage, message]);
  // Handle double tap message => react message
  const handlePressMessage = useCallback(() => {
    const time = new Date().getTime();
    toggleSeen();
    if (timeTapRef.current) {
      const delta = time - timeTapRef.current;

      const DOUBLE_PRESS_DELAY = 400;
      if (delta < DOUBLE_PRESS_DELAY) {
        handleReactMessage(message, '♥️');
        console.log('DOUBLE TAP: ', message.content);
        // Success double press
      }
    }
    timeTapRef.current = time;
    // showMemberSeen.value = withTiming(isToggle ? 0 : 1, {}, finished => {
    //   if (finished) {
    //     runOnJS(toggleSeen)();
    //   }
    // });
    onReactionMessage(null);
  }, [onReactionMessage, handleReactMessage, message, toggleSeen]);

  // ** Handle press icon to react message
  const handlePressIconReaction = (reaction: string) => {
    handleReactMessage(message, reaction);
    onReactionMessage(null);
  };

  // ** ======= Animated styles =======
  // Animated style form contain message
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  // Animated style for icon share
  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        (translateX.value < TRANSLATE_X_THRESHOLD_OWNER && own) ||
          (translateX.value > TRANSLATE_X_THRESHOLD && !own)
          ? 1
          : 0,
      ),
      transform: [
        {
          translateX: withTiming(
            (translateX.value < TRANSLATE_X_THRESHOLD_OWNER && own) ||
              (translateX.value > TRANSLATE_X_THRESHOLD && !own)
              ? 0
              : own
              ? 5
              : -5,
          ),
        },
        {
          scale: withTiming(
            (translateX.value < TRANSLATE_X_THRESHOLD_OWNER && own) ||
              (translateX.value > TRANSLATE_X_THRESHOLD && !own)
              ? 1
              : 0,
          ),
        },
      ],
    };
  });

  // ** ======= Render View =======
  // Render Reply Message
  const renderReplyMessage = () => {
    const renderTitle = () => {
      let prefix = 'Bạn';
      let suffix = 'chính mình';
      if (message.user_id._id !== user?._id) {
        prefix = message.user_id?.full_name?.last;
        if (message.parent_id.user_id?._id !== user?._id) {
          suffix = 'chính mình';
        } else {
          suffix = 'bạn';
        }
      } else {
        if (message.parent_id.user_id?._id === user?._id) {
          suffix = 'chính mình';
        } else {
          suffix = `${message.parent_id.user_id?.full_name?.last}`;
        }
      }
      return `${prefix} đã trả lời ${suffix}`;
    };

    return (
      <>
        <View
          style={[
            spacing('margin', 0, 4).bottom,
            flex.row,
            flex.alignItemsCenter,
            flex.gap4,
          ]}>
          <AppVectorIcons
            type="FontAwesome"
            name={ICON.FontAwesome.share}
            size={hp(1.4)}
          />
          <TextNormalComponent size="sm" align="right">
            {renderTitle()}
          </TextNormalComponent>
        </View>
        <Pressable
          onPress={() => onPressParentMessage(message.parent_id)}
          style={[styles.replyMessage]}>
          {/* SHADOW_STYLE.shadowCard */}
          <TextNormalComponent
            translate={false}
            size="sm"
            color={dark ? COLORS_APP.dark : COLORS_APP.light}>
            {message.parent_id?.content}
          </TextNormalComponent>
        </Pressable>
      </>
    );
  };
  // Render members seen
  const renderMemberSeen = () => {
    return (
      <Animated.View
        entering={FadeInUp.duration(300)}
        exiting={FadeOutUp.duration(300)}
        style={[
          flex.row,
          flex.gap2,
          flex.justifyContentEnd,
          spacing('margin', 0, hp(1)).top,
          spacing('margin', 0, hp(1)).right,
        ]}>
        {message.user_read.slice(0, 3).map(memberRead => (
          <AvatarComponent
            key={memberRead.user_id._id}
            source={
              memberRead.user_id?.avatar
                ? {
                    uri: BASE_URL + memberRead.user_id?.avatar.path,
                  }
                : undefined
            }
            rounded
            fallback_color={memberRead.user_id.fallback_color}
            title={
              !memberRead.user_id?.avatar
                ? getFirstLetter(memberRead.user_id.full_name)
                : undefined
            }
            size={hp(2)}
          />
        ))}
        {message.user_read.length > 3 && (
          <AvatarComponent
            rounded
            title={`+${message.user_read.length - 3}`}
            size={hp(2)}
          />
        )}
      </Animated.View>
    );
  };
  const renderReactionMessage = () => {
    const listUserWithReaction = message.reactions.reduce<
      Record<string, StoreAccount[]>
    >((acc, item) => {
      if (acc[item.type]) {
        acc[item.type] = [...acc[item.type], item.user_id];
      } else {
        acc[item.type] = [item.user_id];
      }
      return acc;
    }, {});
    const itemRendered: string[] = [];
    return (
      <View style={[flex.row, flex.gap2]}>
        {message.reactions.map(reaction => {
          if (itemRendered.includes(reaction.type)) {
            return null;
          }
          itemRendered.push(reaction.type);
          const isReactMessage = listUserWithReaction[reaction.type].find(
            item => item?._id === user?._id,
          );
          let backgroundColor;
          if (own) {
            backgroundColor = isReactMessage ? '#f7f8f9b8' : '#73a2f88a';
          } else {
            backgroundColor = isReactMessage ? '#73a2f88a' : '#b8b2b256';
          }
          return (
            <Pressable
              onPress={() => handlePressIconReaction(reaction.type)}
              key={reaction._id}>
              <View
                style={[
                  flex.alignItemsCenter,
                  flex.justifyContentCenter,
                  flex.row,
                  flex.gap4,
                  styles.reactedMessage,
                  {
                    backgroundColor: backgroundColor,
                  },
                  // SHADOW_STYLE.shadowCard,
                ]}>
                <TextNormalComponent size="xs">
                  {reaction.type}
                </TextNormalComponent>
                <View style={[flex.row]}>
                  {listUserWithReaction[reaction.type] &&
                    listUserWithReaction[reaction.type].map(account => (
                      <AvatarComponent
                        key={account._id}
                        source={
                          account?.avatar
                            ? {
                                uri: BASE_URL + account?.avatar.path,
                              }
                            : undefined
                        }
                        rounded
                        fallback_color={account.fallback_color}
                        title={
                          !account?.avatar
                            ? getFirstLetter(account.full_name)
                            : undefined
                        }
                        size={hp(2)}
                        containerStyle={styles.avatarReactUser}
                      />
                    ))}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };
  const renderImages = () => {
    return (
      <View style={[flex.row, flex.wrap, flex.gap5]}>
        {message.images.map(image => (
          <RenderImageMessageComponent
            key={image._id}
            image={image}
            totalData={message.images.length}
            onPress={img =>
              navigation.navigate('ImageMessageDetails', {
                message: message,
                image: img,
              })
            }
          />
        ))}
      </View>
    );
  };
  const renderForwardMessage = () => {
    return (
      <>
        {/* Full name forward */}
        <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
          <AppVectorIcons
            type="FontAwesome"
            name={ICON.FontAwesome.forward}
            size={hp(1.4)}
            color={own ? '#FFFFFF' : colors.text}
          />
          <TextNormalComponent
            fontWeight="600"
            color={own ? '#FFFFFF' : colors.text}>
            {message.parent_id.user_id?.full_name?.first +
              ' ' +
              message.parent_id.user_id?.full_name?.last}
          </TextNormalComponent>
        </View>

        {/* Content forward */}
        <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
          <View
            style={{
              width: 2,
              height: 12,
              backgroundColor: own ? '#FFFFFF' : colors.primary,
            }}
          />
          <TextNormalComponent
            translate={false}
            color={own ? '#FFFFFF' : colors.text}>
            {message.parent_id.content}
          </TextNormalComponent>
        </View>
      </>
    );
  };

  const styles = styling({colors, dark, own});

  // ** ======= LOGS =======
  // console.log(
  //   user?.account_id.full_name.first +
  //     ' ' +
  //     user?.account_id.full_name.last +
  //     ': ',
  //   message.content,
  // );
  return (
    <Pressable
      onPress={onResetReactionMessage}
      style={[[styles.swipeContainer, flex.gap10]]}>
      {/* ** Icon share */}
      <Animated.View style={[styles.iconReply, animatedIconStyles]}>
        <AppVectorIcons
          type="FontAwesome"
          name={ICON.FontAwesome.reply}
          size={hp(2)}
        />
      </Animated.View>
      {/* Message container */}
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        onGestureEvent={panGestureHandler}>
        <Animated.View style={[animatedStyles]}>
          <View
            style={[
              flex.alignItemsCenter,
              flex.justifyContentCenter,
              spacing('padding', 0, hp(0.4)).bottom,
              flex.row,
            ]}
          />
          <View style={[styles.wrapper]}>
            <Animated.View
              style={[
                spacing('margin').horizontal,
                flex.gap10,
                styles.containMessage,
              ]}>
              {/* ** Render Avatar */}
              {!own && (
                <View>
                  <AvatarComponent
                    source={
                      message.user_id?.avatar
                        ? {
                            uri: (BASE_URL +
                              message.user_id?.avatar.path) as string,
                          }
                        : undefined
                    }
                    rounded
                    title={
                      !message.user_id?.avatar
                        ? getFirstLetter(message.user_id.full_name)
                        : undefined
                    }
                    fallback_color={message.user_id.fallback_color}
                    size={hp(4)}
                    onPress={() =>
                      navigation.navigate('UserChatDetails', {
                        conversationId: message.conversation_id._id,
                      })
                    }
                  />
                </View>
              )}
              <Animated.View
                style={[own ? flex.alignItemsEnd : flex.alignItemsStart]}>
                {message.isPin && (
                  <TextNormalComponent
                    size="sm"
                    variant="secondary"
                    style={{marginBottom: 4}}>
                    Đã ghim tin nhắn phản hồi của bạn
                  </TextNormalComponent>
                )}

                {message.parent_id &&
                  message.type !== 'forward' &&
                  renderReplyMessage()}

                <Pressable
                  onLongPress={handleLongPressMessage}
                  onPress={handlePressMessage}
                  {...passProps}
                  style={[
                    styles.container,
                    passProps.style,
                    message.parent_id && styles.translateMessageToReply,
                    flex.gap4,

                    // SHADOW_STYLE.shadowCard,
                  ]}>
                  {/* Render Images */}
                  {message.images &&
                    message.images.length > 0 &&
                    renderImages()}

                  {/* Render Forward message */}
                  {message.type === 'forward' && renderForwardMessage()}

                  {/* Render Content */}
                  {message.content && (
                    <TextNormalComponent
                      translate={false}
                      color={own ? '#FFFFFF' : colors.text}>
                      {message.content}
                    </TextNormalComponent>
                  )}

                  <View
                    style={[
                      flex.row,
                      flex.justifyContentBetween,
                      flex.alignItemsEnd,
                      flex.gap4,
                    ]}>
                    {/* Render Reaction */}
                    <View>
                      {message.reactions.length > 0 && renderReactionMessage()}
                    </View>
                    {/* Render Timing */}
                    <View
                      style={[
                        flex.row,
                        flex.alignItemsCenter,
                        flex.justifyContentEnd,
                        flex.gap4,
                      ]}>
                      <TextNormalComponent
                        size="xs"
                        color={own ? COLORS_APP.dark : colors.text}
                        translate={false}
                        variant={own ? 'dark' : 'secondary'}
                        align="right">
                        {moment(new Date(message.createdAt)).format('HH:mm')}
                      </TextNormalComponent>
                      {own && (
                        <AppVectorIcons
                          type="Ionicons"
                          name={
                            message.user_read.length > 0
                              ? 'checkmark-done-outline'
                              : 'checkmark-outline'
                          } // checkmark-done-outline | checkmark-outline
                          size={hp(1.4)}
                          color={own ? COLORS_APP.dark : colors.text}
                        />
                      )}
                    </View>
                  </View>
                  {/* Render Pin */}
                  {message.isPin && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 2,
                      }}>
                      <AppVectorIcons type="Entypo" name="pin" size={hp(1.2)} />
                    </View>
                  )}
                </Pressable>

                {/* List member seen */}
                {own &&
                  isToggle &&
                  message.user_read.length > 0 &&
                  renderMemberSeen()}
              </Animated.View>
            </Animated.View>
          </View>

          {/* Reaction */}
          <ListReactionIconComponent
            message={message}
            svReactMessage={svReactMessage}
            onPressReaction={handlePressIconReaction}
          />
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
};

export default memo(MessageItemComponent);
const styling = ({
  own,
  dark,
  colors,
}: StyleSheetProps & Pick<MessageItemProps, 'own'>) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      alignItems: own ? 'flex-end' : 'flex-start',
    },
    swipeContainer: {},
    container: {
      paddingHorizontal: hp(1.5),
      paddingVertical: hp(1.5),
      backgroundColor: own ? colors.primary : colors.card,
      borderRadius: hp(1.5),
      borderTopLeftRadius: own ? hp(1.5) : 2,
      borderTopRightRadius: own ? 2 : hp(1.5),
      position: 'relative',
    },
    containMessage: {
      flexDirection: own ? 'row-reverse' : 'row',
      maxWidth: '70%',
    },
    translateMessageToReply: {
      transform: [
        {
          translateY: hp(-1),
        },
      ],
    },
    replyMessage: {
      paddingHorizontal: hp(1.5),
      paddingVertical: hp(1.5),
      paddingBottom: hp(2.5),
      backgroundColor: dark ? '#152348' : '#d8d8d8',
      borderRadius: hp(1.5),
      position: 'relative',
    },
    loadingMessage: {
      width: hp(10),
      paddingHorizontal: hp(1.5),
      paddingVertical: hp(1.5),
      backgroundColor: colors.card,
      borderRadius: hp(1.5),
      borderTopLeftRadius: 2,
      height: HEIGHT_MESSAGE_LOADING,
    },
    iconReply: {
      position: 'absolute',
      [own ? 'right' : 'left']: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reactedMessage: {
      [own ? 'left' : 'right']: 0,
      borderRadius: 50,
      paddingVertical: hp(0.4),
      paddingHorizontal: hp(0.6),
    },
    avatarReactUser: {
      left: 2,
      zIndex: 2,
    },
  });
