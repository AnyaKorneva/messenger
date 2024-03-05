import Block from '../../utils/Block';
import template from './template';

interface Props {
  label: string;
  type?: 'submit' | 'button';
  onClick?: EventListener;
}

class Button extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
