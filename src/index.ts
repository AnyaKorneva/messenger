import render from './utils/render';
import { routes } from './constants';
import login from './pages/auth';
import registrationPage from './pages/registration';
import commonSettingsPage from './pages/commonSettings';
import passwordSettingsPage from './pages/passwordSettings';
import profilePage from './pages/profile';
import notFoundPage from './pages/notFound';
import serverErrorPage from './pages/serverError';
import chatPage from './pages/chat';

function handleRouteChange() {
  const path = window.location.pathname;
  switch (path) {
    case routes.auth:
      render('#app', login);
      break;
    case routes.registration:
      render('#app', registrationPage);
      break;
    case routes.commonSettings:
      render('#app', commonSettingsPage);
      break;
    case routes.passwordSettings:
      render('#app', passwordSettingsPage);
      break;
    case routes.profile:
      render('#app', profilePage);
      break;
    case routes.chat:
      render('#app', chatPage);
      break;
    case routes.serverError:
      render('#app', serverErrorPage);
      break;
    default:
      render('#app', notFoundPage);
  }
}

window.onpopstate = handleRouteChange;

handleRouteChange();
