import Block from '../../utils/Block';
import template from './template';
import { FixLater } from '../../constants';

interface Props {
  error: FixLater,
  link: FixLater;
}

class NotFound extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default NotFound;
