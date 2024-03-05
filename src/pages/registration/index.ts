import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';
import Registration from './Registation';
import { submitForm, validateField } from '../../utils/form';
import { formIds, routes, FixLater } from '../../constants';

const data = [
  { type: 'email', label: 'Почта', name: 'email', required: true, value: '' },
  { type: 'text', label: 'Логин', name: 'login', required: true, value: '' },
  { type: 'text', label: 'Имя', name: 'first_name', required: true, value: '' },
  { type: 'text', label: 'Фамилия', name: 'second_name', required: true, value: '' },
  { type: 'tel', label: 'Телефон', name: 'phone', required: true, value: '' },
  { type: 'password', label: 'Пароль', name: 'password', required: true, value: '' },
  { type: 'password', label: 'Пароль (ещё раз)', name: 'password_new', required: true, value: '' },
];

const inputs = data.map((item) => {
  const { name } = item;
  return new Input('label', {
    ...item,
    attr: { class: 'form__input' },
    id: name,
    withError: true,
    events: {
      input: (event: Event) => validateField(event.target as HTMLInputElement),
      blur: (event: FocusEvent) => validateField(event.target as HTMLInputElement),
    },
  });
});

const loginLink = new Link('a', {
  attr: { class: 'link center' },
  content: 'Войти',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.auth;
    },
  },
});

const registrationButton = new Button('button', {
  attr: { class: 'button' },
  class: 'button',
  type: 'submit',
  label: 'Зарегистрироваться',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: FixLater = document.getElementById(formIds.registration);
      submitForm(form);
    },
  },
});

export default new Registration('main', {
  attr: { class: 'auth-wrapper' },
  inputs,
  registrationButton,
  formId: formIds.registration,
  loginLink,
});
