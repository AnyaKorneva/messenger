import Block from '../../utils/Block';
import template from './template';

interface Props {
  name: string;
  message: string;
  time: string;
  notification?: number;
}

class ChatPreview extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPreview;
