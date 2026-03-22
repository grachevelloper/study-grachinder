import EventEmitter from 'eventemitter3';

import { type AppEmitter } from '../../typings/event';

const eventEmitter = new EventEmitter();

export const UserEmitter: AppEmitter = {
    on: (event, fn) => eventEmitter.on(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, fn) => eventEmitter.emit(event, fn),
    once: (event, fn) => eventEmitter.once(event, fn),
};

export const USER_EVENT = {
    UPDATE: 'user:update',
    SYNC: 'user:sync',
};

Object.freeze(UserEmitter);