import { FixLater } from '../constants';

type EventListener = (...args: FixLater[]) => void;

class EventBus {
  private readonly listeners: { [event: string]: EventListener[] } = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(callback);
  }

  off(event: string, callback: EventListener) {
    const currentListeners = this.listeners[event];
    if (!currentListeners) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = currentListeners ? currentListeners.filter(
      (listener) => listener !== callback,
    ) : [];
  }

  emit(event: string, ...args: FixLater) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]?.forEach((listener) => {
      if (listener) {
        listener(...args);
      }
    });
  }
}

export default EventBus;
