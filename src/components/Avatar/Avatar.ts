import Block from '../../utils/Block';
import template from './template';

interface Props {
  isBig?: boolean;
  canEdit?: boolean;
  src: string,
}

class Avatar extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Avatar;
