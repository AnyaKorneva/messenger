import Block from '../../utils/Block.ts';
import template  from './template.ts';

interface Props {
  children: any;
  content: any;
}

class Layout extends Block<Props> {
  render() {
    return this.compile(template, { children: this.props.children });
  }
}

export default Layout;
