import Block from '../../utils/Block';
import template from './template';

interface Props {
  id?: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  withError: boolean;
  events: {
    click: (event: MouseEvent) => void;
  };
}

class Input extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
