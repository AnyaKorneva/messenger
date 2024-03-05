import ProfileItem from '../../components/ProfileItem';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import Profile from './Profile';
import data from '../../mocks/profile';
import { routes } from '../../constants';

const profileItems = data.map(({ label, value }) => new ProfileItem('li', { label, value }));

const commonSettingsLink = new Link('a', {
  attr: {
    class: 'link',
  },
  content: 'Изменить данные',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.commonSettings;
    },
  },
});

const passwordSettingsLink = new Link('a', {
  attr: {
    class: 'link',
  },
  content: 'Изменить пароль',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.passwordSettings;
    },
  },
});

const logoutLink = new Link('a', {
  attr: {
    class: 'link link_red',
  },
  content: 'Выйти',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.auth;
    },
  },
});

const backLink = new Link('a', {
  attr: {
    class: 'back-button',
  },
  content: '<img src="/back.svg" alt="back"/>',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const avatar = new Avatar('div', {
  isBig: true,
  canEdit: false,
  src: '/avatar.png',
});

export default new Profile('div', {
  attr: {
    class: 'profile-wrapper',
  },
  profileItems,
  commonSettingsLink,
  passwordSettingsLink,
  logoutLink,
  backLink,
  avatar,
});
