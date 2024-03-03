import Link from '../../components/Link';
import Error from '../../components/Error';
import ServerError from './ServerError';
import { routes } from '../../constants';

const link = new Link('a', {
  attr: { class: 'link center' },
  content: 'Назад к чатам',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const error = new Error('div', { attr: { class: 'center' }, code: '500', text: 'Что-то пошло не так...' });

export default new ServerError('main', {
  attr: { class: 'error-wrapper' },
  link,
  error,
});
