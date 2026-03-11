import EventEmitter from 'eventemitter3';

type Events = 'on' | 'once' | 'off' | 'emit';

export type AppEmitter = Pick<EventEmitter, Events>;