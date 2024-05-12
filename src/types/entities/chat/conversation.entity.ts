import {Nullable} from '@/types/commons';
import {StoreMessage} from './message.entity';
import {StoreAccount} from '../accounts';

export type StoreConversation = {
  _id: string;
  name: string;
  message_pinned: Nullable<StoreMessage>;
  createdAt: string;
  updatedAt: string;

  members: Array<StoreAccount>;

  type: ConversationType;
  isActive: boolean;
  user_pins: PinConversation[];
  // ** for group
  captain_id: string;
  last_message: LastMessageConversation[];
};
export type ConversationType = 'private' | 'group';

export type PinConversation = {
  user_id: StoreAccount['_id'];
  pinned_at: string;
};

export type LastMessageConversation = {
  user_id: StoreAccount;
  message_id: StoreMessage;
};
