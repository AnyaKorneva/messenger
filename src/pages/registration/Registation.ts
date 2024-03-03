import Block from '../../utils/Block';
import template from './template';

interface Props {
  formId: string;
}

class Registration extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Registration;
