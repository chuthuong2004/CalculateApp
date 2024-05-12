import {StoreMessage} from '@/types/entities';
import {messageService} from '@services/chat';
import {socketServices} from '@services/socket';
import {ParamCreateMessage} from '@services/types';
import {useCallback} from 'react';

export function useMessage() {
  const handleSendMessage = useCallback((message: ParamCreateMessage) => {
    try {
      socketServices.emit('create-message', message);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePinMessage = useCallback(
    (message: StoreMessage, action: 'pin' | 'unpin') => {
      socketServices.emit(action === 'pin' ? 'message-pin' : 'message-unpin', {
        message_id: message._id,
      });
    },
    [],
  );

  const handleReactMessage = useCallback(
    async (message: StoreMessage, reaction: string) => {
      socketServices.emit('reaction-message', {
        message_id: message._id,
        type: reaction,
      });
      // if (reacted) {
      //   mutate(
      //     `MessageByConversation${message.conversation_id._id}`,
      //     (prevData: ResponsePagination<StoreMessage> | undefined) => {
      //       if (!prevData) {
      //         return undefined;
      //       }
      //       const indexReacted = prevData.docs.findIndex(
      //         docs => docs._id === reacted._id,
      //       );
      //       if (indexReacted === -1) {
      //         return prevData;
      //       }
      //       // prevData.docs[indexReacted] = {...reacted, content: 'Đã reacted'};
      //       // const newDocs = prevData.docs;
      //       return {...prevData, docs: prevData.docs};
      //     },
      //     {revalidate: false},
      //   );
      // }
    },
    [],
  );

  const handleSeenMessage = useCallback(async (conversation_id: string) => {
    try {
      await messageService.seenMessage(conversation_id);
    } catch (error) {
      console.log('error');
    }
  }, []);

  const handleDeleteMessage = useCallback(
    (messageId: string, userIdsDelete: string[]) => {
      console.log({messageId, userIdsDelete});

      socketServices.emit('delete-message', {
        messageId,
        userIdsDelete,
      });
    },
    [],
  );
  return {
    onSendMessage: handleSendMessage,
    onPinMessage: handlePinMessage,
    onReactMessage: handleReactMessage,
    onSeenMessage: handleSeenMessage,
    onDeleteMessage: handleDeleteMessage,
  };
}
