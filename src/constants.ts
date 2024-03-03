const emptyError = 'Поле обязательно к заполнению';
const incorrectError = 'Поле заполнено не корректно';
const errorClass = 'invalid';

type FixLater = any;

const formIds = {
  auth: 'authForm',
  registration: 'registrationForm',
  commonSettings: 'commonSettingsForm',
  passwordSettings: 'passwordSettings',
  message: 'messageForm',
};

const routes = {
  auth: '/',
  registration: '/registration',
  commonSettings: '/commonSettings',
  passwordSettings: '/passwordSettings',
  profile: '/profile',
  chat: '/chat',
  settings: '/settings',
  serverError: '/500',
};

export {
  emptyError,
  incorrectError,
  errorClass,
  formIds,
  routes,
  FixLater,
};
