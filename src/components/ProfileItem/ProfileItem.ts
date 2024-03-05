import template from './template';
import Block from '../../utils/Block';

interface Props {
  label: string;
  value: string;
}

export default class ProfileItem extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}
