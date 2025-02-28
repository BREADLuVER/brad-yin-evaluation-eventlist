
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

class EventlistView {
    constructor() {
        this.eventsList = document.querySelector(".events-list");
        this.newEventForm = document.querySelector(".new-event-form");
        this.newEventTitle = document.querySelector("#new-event-title");
        this.newEventStart = document.querySelector("#new-event-start-date");
        this.newEventEnd = document.querySelector("#new-event-end-date");
        this.addEventBtn = document.querySelector(".add-event-btn");
        this.eventsContainer = document.querySelector(".event-list_items");

        this.addEventBtn.addEventListener("click", () => {
            this.newEventForm.style.display = "block";
        });
    }

    renderEvents(events) {
        this.eventsContainer.innerHTML = "";
        for (const event of events) {
            this.addEvent(event);
        }
    }

    addEvent(newEvent) {
        const { id, title, startDate, endDate } = newEvent;
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.id = `event-${id}`;
        eventElement.innerHTML = `
            <span class="event__title">${title} (${startDate} - ${endDate})</span>
            <button class="event__delete">Delete</button>
        `;
        this.eventsList.appendChild(eventElement);
    }

    removeEvent(eventId) {
        const eventElement = document.getElementById(`event-${eventId}`);
        if (eventElement) eventElement.remove();
    }
}

class EventlistController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    async init() {
        const events = await eventlistAPI.fetchEvent();
        this.model.setEvents(events);
        this.view.renderEvents(events);

        this.setupAddEvent();
        this.setupDeleteEvent();
    }

    setupAddEvent() {
        this.view.newEventForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = this.view.newEventTitle.value;
            const startDate = this.view.newEventStart.value;
            const endDate = this.view.newEventEnd.value;

            if (!title || !startDate || !endDate) return;

            const newEvent = await eventlistAPI.addEvent({ title, startDate, endDate });

            this.model.addEvent(newEvent);
            this.view.addEvent(newEvent);

            this.view.newEventForm.reset();
            this.view.newEventForm.style.display = "none";
        });
    }

    setupDeleteEvent() {
        this.view.eventsList.addEventListener("click", async (e) => {
            if (e.target.classList.contains("event__delete")) {
                const eventElem = e.target.parentElement;
                const eventId = eventElem.id.split("-")[1];

                await eventlistAPI.deleteEvent(eventId);
                this.model.removeEvent(eventId);
                this.view.removeEvent(eventId);
            }
        });
    }
}


const eventlistModel = new EventlistModel();
const eventlistView = new EventlistView();
const eventlistController = new EventlistController(eventlistModel, eventlistView);