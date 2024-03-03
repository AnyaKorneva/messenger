import Block from '../../utils/Block';
import template from './template';

interface Props {
  text: string;
  time: string;
}

class Message extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Message;
