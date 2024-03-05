import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import CommonSettings from './CommonSettings';
import { submitForm, validateField } from '../../utils/form';
import { formIds, routes, FixLater } from '../../constants';

const data = [
  { type: 'email', label: 'Почта', placeholder: 'test@yandex.ru', name: 'email', required: true, value: '' },
  { type: 'text', label: 'Логин', placeholder: 'User', name: 'login', required: true, value: '' },
  { type: 'text', label: 'Имя', placeholder: 'First name', name: 'first_name', required: true, value: '' },
  { type: 'text', label: 'Фамилия', placeholder: 'Second name', name: 'second_name', required: true, value: '' },
  { type: 'text', label: 'Имя в чате', placeholder: 'Displayed name', name: 'display_name', required: true, value: '' },
  { type: 'tel', label: 'Телефон', placeholder: '+7 (909) 777 77 77', name: 'phone', required: true, value: '' },
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
  type: 'submit',
  label: 'Сохранить',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: FixLater = document.getElementById(formIds.commonSettings);
      submitForm(form);
    },
  },
});

const avatar = new Avatar('div', {
  isBig: true,
  canEdit: true,
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

export default new CommonSettings('div', {
  attr: { class: 'profile-wrapper' },
  inputs,
  button,
  avatar,
  backLink,
  formId: formIds.commonSettings,
});
