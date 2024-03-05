import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Auth from './Auth';
import { formIds, routes } from '../../constants';
import { validateField, submitForm } from '../../utils/form';

const data = [
  { type: 'text', label: 'Логин', name: 'login', required: true, value: '' },
  { type: 'password', label: 'Пароль', name: 'password', required: true, value: '' },
];

const inputs = data.map((item) => {
  const { name } = item;
  const input = new Input('label', {
    ...item,
    attr: { class: 'form__input' },
    id: name,
    withError: true,
    events: {
      input: (event: Event) => validateField(event.target as HTMLInputElement),
      blur: (event: FocusEvent) => validateField(event.target as HTMLInputElement),
    },
  });

  return input;
});

const loginButton = new Button('button', {
  attr: { class: 'button' },
  label: 'Войти',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: HTMLElement = document.getElementById(formIds.auth) as HTMLElement;
      submitForm(form);
    },
  },
});

const registrationLink = new Link('a', {
  attr: { class: 'link center' },
  content: 'Нет аккаунта?',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.registration;
    },
  },
});

export default new Auth('main', {
  attr: { class: 'auth-wrapper' },
  formId: formIds.auth,
  loginButton,
  registrationLink,
  inputs,
});
