import EventlistController from "./EventlistController.js";
import EventlistView from "./EventlistView.js";

class EventlistModel {
    #events;
    constructor() {
        this.#events = []
    }

    setEvents(events) {
        this.#events=events
    }

    getEvents(){
        return this.#events
    }

    addEvent(event) {
        this.#events.push(event)
    }

    updateEvent(eventID, updatedEvent) {
        this.#events = this.#events.map((event) =>
            event.id === eventID ? updatedEvent : event
        );
    }

    removeEvent(eventID) {
        this.#events = this.#events.filter(event => event.id !== eventID)
    }
}


const eventlistModel = new EventlistModel();
const eventlistView = new EventlistView();
const eventlistController = new EventlistController(eventlistModel, eventlistView);