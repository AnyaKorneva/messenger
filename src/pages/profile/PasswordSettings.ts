import Block from '../../utils/Block.ts';
import template from './template.ts';

interface Props {
  formId: string;
  inputs: any;
  button: any;
  avatar: any;
}

class PasswordSettings extends Block<Props> {
  render() {
    return this.compile(template, {
      ...this.props,
      inputs: this.props.inputs,
      button: this.props.button,
      avatar: this.props.avatar,
    });
  }
}

export default PasswordSettings;
