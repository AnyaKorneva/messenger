import Block from '../../utils/Block';
import template from './template';
import { FixLater } from '../../constants';

class Profile extends Block<FixLater> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Profile;
