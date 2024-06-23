import {IEvent} from "./IEvent";
import "reflect-metadata";

export interface IEventDispatcher {
    addEventListener(eventType: string, listener: any, scope?: any): void;
    removeEventListener(eventType: string, listener: any, scope?: any): void;
    dispatchEvent(event: IEvent): void;
}

export class EventDispatcher implements IEventDispatcher {
    private static instance: EventDispatcher;

    private listeners: {
        [key: string]: Array<{ listener: any; scope?: any }>;
    } = {};

    static getInstance(): EventDispatcher {
        if (!EventDispatcher.instance) {
            EventDispatcher.instance = new EventDispatcher();
        }
        return EventDispatcher.instance;
    }

    addEventListener(eventType: string, listener: any, scope?: any): void {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push({ listener, scope });
    }

    removeEventListener(eventType: string, listener: any, scope?: any): void {
        if (!this.listeners[eventType]) {
            return;
        }
        const index = this.listeners[eventType].findIndex(
            (item) => item.listener === listener && item.scope === scope
        );
        if (index >= 0) {
            this.listeners[eventType].splice(index, 1);
        }
    }

    dispatchEvent(event: IEvent): void {
        if (!this.listeners[event.eventType]) {
            return;
        }
        this.listeners[event.eventType].forEach((item) => {
            item.listener.call(item.scope, event);
        });
    }
}