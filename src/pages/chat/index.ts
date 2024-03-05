import Avatar from '../../components/Avatar';
import Message from '../../components/Message';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';
import ChatPreview from '../../components/ChatPreview';
import { formIds, routes, FixLater } from '../../constants';
import { submitForm, validateField } from '../../utils/form';
import currentChatData from '../../mocks/messages';
import chatsData from '../../mocks/previews';
import Chat from './Chat';

const profileLink = new Link('a', {
  attr: { class: 'chats-panel__profile-link link' },
  content: 'Профиль <img src="/arrow.svg" alt="Переход в профиль"/>',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.profile;
    },
  },
});

const getAvatar = (src: string) => new Avatar('div', {
  isBig: false,
  canEdit: false,
  src,
});

const chats = chatsData.map((item) => {
  const { isActive, avatar } = item;
  const className = isActive ? 'chat-preview chat-preview_active' : 'chat-preview';
  const chat = new ChatPreview('li', {
    ...item,
    attr: { class: className },
    avatar: getAvatar(avatar),
  });

  return chat;
});

const messages = currentChatData.messages.map((item) => {
  const { time, text, isMyMessage } = item;
  const className = isMyMessage ? 'chat__message chat__message_my' : 'chat__message';
  const messagesList = new Message('li', {
    attr: { class: className },
    time,
    text,
  });
  return messagesList;
});

const messageInput = new Input('label', {
  attr: { class: 'message-panel__input' },
  type: 'text',
  placeholder: 'Сообщение',
  id: 'message',
  value: '',
  name: 'message',
  events: {
    input: (event: Event) => validateField(event.target as HTMLInputElement),
    blur: (event: FocusEvent) => validateField(event.target as HTMLInputElement),
  },
});

const sendButton = new Button('button', {
  attr: {
    class: 'message-panel__send-button',
  },
  type: 'submit',
  label: '<img src="/send.svg" alt="Отправить"/>',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: FixLater = document.getElementById(formIds.message);
      submitForm(form);
    },
  },
});

const attachButton = new Button('button', {
  attr: {
    class: 'message-panel__attach-button',
  },
  type: 'button',
  label: '<img src="/attach.svg" alt="attach"/>',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      // TODO: open modal for attach file/photo
      console.log('attach');
    },
  },
});

export default new Chat('div', {
  attr: {
    class: 'chat-wrapper',
  },
  profileLink,
  chats,
  messages,
  messageInput,
  sendButton,
  attachButton,
  avatar: getAvatar(currentChatData.avatar),
  name: currentChatData.name,
  formId: formIds.message,
});
