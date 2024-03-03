import Block from '../../utils/Block';
import template from './template';

interface Props {
  formId: string;
}

class PasswordSettings extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default PasswordSettings;
