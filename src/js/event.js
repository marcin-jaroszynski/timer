export class Event {
  constructor() {
    this.events = {};
  }

  on(eventId, eventCallback) {
    this.events[eventId] = eventCallback;
  }

  off(eventId) {
    if (this.events[eventId]) {
      delete this.events[eventId];
    }
  }

  fire(eventId, params) {
    if (this.events[eventId]) {
      this.events[eventId].apply({}, params);
    }
  }
}