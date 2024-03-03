import template from './template';
import Block from '../../utils/Block';

interface Props {
  code: string;
  text: string;
}

export default class Error extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}
