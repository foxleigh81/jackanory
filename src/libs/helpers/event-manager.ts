export const enum Event {
  Show,
  Clear,
  DidMount,
  WillUnmount,
  Change,
  ClearWaitingQueue
}

type OnShowCallback = (content: React.ReactNode, props: unknown) => void;
type OnClearCallback = (id: number) => void;

type Callback = OnShowCallback | OnClearCallback;
type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<Event, Callback[]>;
  emitQueue: Map<Event, TimeoutId[]>;
  on(event: Event.Show, callback: OnShowCallback): EventManager;
  on(event: Event.Clear, callback: OnClearCallback): EventManager;
  off(event: Event, callback?: Callback): EventManager;
  emit(event: Event.Show, content: React.ReactNode, props: unknown): void;
  emit(event: Event.Clear, id?: string | number): void;
  emit(event: Event.Change, data: unknown): void;
}

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event: Event, callback: Callback) {
    if (!this.list.has(event)) this.list.set(event, []);
    this.list.get(event)?.push(callback);
    return this;
  },

  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event)?.filter((cb) => cb !== callback);
      if (!cb) return this;
      this.list.set(event, cb);
      return this;
    }
    this.list.delete(event);
    return this;
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call events as follow (uses toast as example):
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event: Event, ...args: unknown[]) {
    this.list.get(event)?.forEach((callback: Callback) => {
      const timer: TimeoutId = setTimeout(() => {
        // @ts-expect-error - This method works but it's not great. TODO: Fix
        callback(...args);
      }, 0);
      if (!this.emitQueue.has(event)) this.emitQueue.set(event, []);
      this.emitQueue.get(event)?.push(timer);
    });
  }
};

export default eventManager;
