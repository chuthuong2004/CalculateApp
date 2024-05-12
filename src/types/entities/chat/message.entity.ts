import {Nullable} from '@/types/commons';
import {StoreAccount} from '../accounts';
import {StoreConversation} from './conversation.entity';
import {StoreImage} from '../medical';

export type StoreMessage = {
  _id: string;
  conversation_id: StoreConversation;
  user_id: StoreAccount;
  content: string;
  parent_id: StoreMessage;
  createdAt: string;
  updatedAt: string;
  replyMessage: Nullable<StoreMessage>;
  user_read: UserRead[];
  user_delete: string[];
  seenAt: Date;
  type: MessageType;
  isPin: boolean;
  reactions: StoreReaction[];
  images: StoreImage[];
};

export type UserRead = {
  user_id: StoreAccount;
  read_at: string;
  _id: string;
};
export type StoreReaction = {
  _id: string;
  type: string;
  message_id: StoreMessage['_id'];
  user_id: StoreAccount;
  createdAt?: string;
};

export type MessageType =
  | 'message'
  | 'reply'
  | 'group'
  | 'message-pin'
  | 'forward';
