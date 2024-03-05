import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import { FixLater } from '../constants';

interface EventBusOptions {
  on(event: string, callback: (...args: FixLater[]) => void): void;
  off(event: string, callback: (...args: FixLater[]) => void): void;
  emit(event: string, ...args: FixLater[]): void;
}

class Block<Props extends { [key: string]: FixLater }> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  private _element: HTMLElement | null = null;

  private _setUpdate = false;

  private _id: string;

  public children: Props;

  public lists: Props;

  public props: Props;

  public eventBus: () => EventBus;

  public meta: {
    tagName: string;
    props: Props;
  };

  constructor(tagName = 'div', propsAndChildren = {}) {
    const { children, lists, props } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();

    this.meta = {
      tagName,
      props,
    };
    this._id = makeUUID();
    this.children = this._makePropsProxy(children);
    this.lists = this._makePropsProxy(lists);
    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBusOptions) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const { tagName } = this.meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this.children).length) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }
    const oldValue: Props = { ...this.props };
    const { children, props, lists } = this._getChildren(nextProps);

    if (Object.values(this.children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(this.lists).length) {
      Object.assign(this.lists, lists);
    }

    if (Object.values(this.props).length) {
      Object.assign(this.props, props);
    }

    if (this._setUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  }

  private _makePropsProxy(props: FixLater) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },
    });
  }

  get element() {
    return this._element;
  }

  private _render() {
    const { props } = this.meta;

    const block: FixLater = this.render();

    this._removeEvents();

    if (this._element) {
      this._element.innerHTML = '';
      this._element.appendChild(block);
      this.addAttribute(props);
      this._addEvents();
    }
  }

  render() {}

  addAttribute(props: FixLater) {
    const { attr = {} }: FixLater = props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  private _getChildren(propsAndChildren: FixLater) {
    const children: FixLater = {};
    const props: FixLater = {};
    const lists: FixLater = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  compile(template: FixLater, props: FixLater): DocumentFragment {
    const propsAndStubs: FixLater = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      console.log(list);
      propsAndStubs[key] = `<div data-id="__1_${key}"></div>`;
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;

    const compiledTemplate = Handlebars.compile(template);
    fragment.innerHTML = compiledTemplate(propsAndStubs);

    Object.values(this.children).forEach((child: FixLater) => {
      const stub: FixLater = fragment.content.querySelector(
        `[data-id="${child._id}"]`,
      );

      stub.replaceWith(child.getContent() as HTMLElement);
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      const stub: FixLater = fragment.content.querySelector(
        `[data-id="__1_${key}"]`,
      );
      if (!stub) {
        return;
      }
      const listContent = this._createDocumentElement(
        'template',
      ) as HTMLTemplateElement;

      list.forEach((el: FixLater | string) => {
        if (el instanceof Block) {
          listContent.content.append(el.getContent() as HTMLElement);
        } else {
          listContent.content.append(`${el}`);
        }
      });

      stub.replaceWith(listContent.content);
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const { withInternalID = false } = this.props;
    const elem = document.createElement(tagName);
    if (withInternalID) {
      elem.setAttribute('data-id', this._id);
    }
    return elem;
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName: string) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  show() {
    (this.getContent() as HTMLElement).style.display = 'block';
  }

  hide() {
    (this.getContent() as HTMLElement).style.display = 'none';
  }
}

export default Block;
