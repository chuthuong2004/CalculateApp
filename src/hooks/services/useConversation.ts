import {useCallback, useState} from 'react';
import {conversationService} from '@services/chat';
import {ParamMutateConversation} from '@services/types';
import {StoreConversation} from '@/types/entities';
import {ErrCallbackType} from '../types';
import {handleErrorHooks} from '@utils/utilities';
import {useSWRConfig} from 'swr';
import {ResponsePagination} from '@/types/commons';

/**
 * This hook will handle interaction with the API (CRUD).
 * @returns {Object} Object contain callbacks
 *    @property {function} onCreateConversation This function will create new conversation
 *    @property {function} onPinConversation This function will pin or unpin conversation
 *    @property {function} onDeleteConversation This function will delete conversation
 *    @property {function} onMarkAsRead This function will handle marking the message as read
 *    @property {function} onTurnOffConversation This function will handle turn of notification
 */
export function useConversation() {
  const [loading, setLoading] = useState(false);
  const {mutate} = useSWRConfig();

  /**
   * This function will handle create new conversation
   * @param {object} params The params to create new conversation
   * @param {string} type Type is enum pin | unpin
   * @param {function} successCallback The callback called when function executed successfully
   * @param {function} errorCallback The callback called when function executed error, return object contain message
   */
  const handleCreateConversation = useCallback(
    async (
      params: ParamMutateConversation,
      callbackSuccess: (newConversation: StoreConversation) => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        console.log('Params: ', params);

        const newConversation = await conversationService.create(params);
        if (newConversation) {
          console.log('CREATED CONVER: ', newConversation);

          callbackSuccess(newConversation);
        }
      } catch (error: any) {
        console.log('ERROR CONVERSATION CRAETED: ', error?.response?.data);

        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /**
   * This function will handle pin or unpin conversation
   * @param {string} conversationId The ID of the conversation
   * @param {string} type Type is enum pin | unpin
   * @param {function} successCallback The callback called when function executed successfully
   * @param {function} errorCallback The callback called when function executed error, return object contain message
   */
  const handlePinConversation = useCallback(
    async (
      conversationId: string,
      type: 'pin' | 'remove-pin',
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        const pinned = await conversationService.pinConversation(
          conversationId,
          type,
        );
        console.log('PIN CONVERSATION: ' + conversationId);
        if (pinned) {
          successCallback();
          mutate('ConversationList');
        }
      } catch (error: any) {
        console.log('ERROR PIN CONVERSATION: ' + error?.response.data);
        handleErrorHooks(error, errorCallback);
      }
    },
    [mutate],
  );

  /**
   * This function will handle delete conversation
   * @param {string} conversationId The ID of the conversation
   * @param {function} successCallback The callback called when function executed successfully
   * @param {function} errorCallback The callback called when function executed error, return object contain message
   */
  const handleDeleteConversation = useCallback(
    async (
      conversationId: string,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        const deleted = await conversationService.delete(conversationId);
        console.log('DELETE CONVERSATION: ' + deleted);
        successCallback();
        mutate(
          'ConversationList',
          (prevData: ResponsePagination<StoreConversation> | undefined) => {
            if (!prevData) {
              return undefined;
            }
            const indexReacted = prevData.docs.findIndex(
              docs => docs._id === deleted._id,
            );
            if (indexReacted === -1) {
              return prevData;
            }
            return {
              ...prevData,
              docs: prevData.docs.filter(docs => docs._id !== deleted._id),
              totalDocs: prevData.totalDocs - 1,
            };
          },
          {revalidate: false},
        );
      } catch (error: any) {
        console.log('ERROR DELETE CONVERSATION: ' + error?.response.data);

        handleErrorHooks(error, errorCallback);
      }
    },
    [mutate],
  );

  /**
   * This function will handle marking the message as read
   * @param {string} conversationId The ID of the conversation
   * @param {function} successCallback The callback called when function executed successfully
   * @param {function} errorCallback The callback called when function executed error, return object contain message
   */
  const handleMarkAsRead = useCallback(
    (
      conversationId: string,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        console.log('MARK AS READ CONVERSATION: ' + conversationId);

        successCallback();
      } catch (error: any) {
        console.log('ERROR MARK AS READ CONVERSATION: ' + error?.response.data);
        handleErrorHooks(error, errorCallback);
      }
    },
    [],
  );

  /**
   * This function will handle turn of notification conversation
   * @param {string} conversationId The ID of the conversation
   * @param {function} successCallback The callback called when function executed successfully
   * @param {function} errorCallback The callback called when function executed error, return object contain message
   */
  const handleTurnOffConversation = useCallback(
    (
      conversationId: string,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        console.log('TURN OFF CONVERSATION: ' + conversationId);
        successCallback();
      } catch (error: any) {
        console.log('ERROR TURN OFF CONVERSATION: ' + error?.response.data);

        handleErrorHooks(error, errorCallback);
      }
    },
    [],
  );
  return {
    loading,
    onCreateConversation: handleCreateConversation,
    onPinConversation: handlePinConversation,
    onDeleteConversation: handleDeleteConversation,
    onMarkAsRead: handleMarkAsRead,
    onTurnOffNotification: handleTurnOffConversation,
  };
}
