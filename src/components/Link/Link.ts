import Block from '../../utils/Block';
import template from './template';

interface Props {
  content: string;
  onClick?: EventListener;
}
class Link extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Link;
