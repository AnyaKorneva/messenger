import Link from '../../components/Link/index';
import Error from '../../components/Error/index';
import NotFound from './NotFound';
import { routes } from '../../constants';

const link = new Link('a', {
  attr: {
    class: 'link center',
  },
  content: 'Назад к чатам',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const error = new Error('div', { attr: { class: 'center' }, code: '404', text: 'Страница не найдена' });

export default new NotFound('main', {
  attr: {
    class: 'error-wrapper',
  },
  link,
  error,
});
