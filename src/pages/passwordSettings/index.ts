import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import PasswordSettings from './PasswordSettings';
import { submitForm, validateField } from '../../utils/form';
import { formIds, routes, FixLater } from '../../constants';

const data = [
  { type: 'password', label: 'Старый пароль', placeholder: '*********', name: 'oldPassword', required: true, value: '' },
  { type: 'password', label: 'Новый пароль', placeholder: '*********', name: 'newPassword', required: true, value: '' },
  { type: 'password', label: 'Новый пароль (еще раз)', placeholder: '*********', name: 'newPasswordRepeat', required: true, value: '' },
];

const inputs = data.map((item) => {
  const { name } = item;
  return new Input('label', {
    ...item,
    id: name,
    withError: true,
    events: {
      input: (event: Event) => validateField(event.target as HTMLInputElement),
      blur: (event: FocusEvent) => validateField(event.target as HTMLInputElement),
    },
  });
});

const button = new Button('button', {
  attr: { class: 'button' },
  class: 'button',
  type: 'submit',
  label: 'Сохранить',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: FixLater = document.getElementById(formIds.passwordSettings);
      submitForm(form);
    },
  },
});

const avatar = new Avatar('div', {
  isBig: true,
  canEdit: false,
  src: '/avatar.png',
});

const backLink = new Link('a', {
  attr: { class: 'back-button' },
  content: '<img src="/back.svg" alt="back"/>',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

export default new PasswordSettings('div', {
  attr: { class: 'profile-wrapper' },
  inputs,
  button,
  avatar,
  backLink,
  formId: formIds.passwordSettings,
});
