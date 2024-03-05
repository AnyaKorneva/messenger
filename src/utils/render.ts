import Block from '../utils/Block';
import { FixLater } from '../constants';

export default function render(rootSelector: string, component: Block<FixLater>) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root not found!');
  }
  component.dispatchComponentDidMount();
  root.innerHTML = '';

  root.append(component.getContent() as HTMLElement);
}
