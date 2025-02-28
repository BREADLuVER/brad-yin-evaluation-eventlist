export default class EventlistController {
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
            const eventName = this.view.newEventTitle.value;
            const startDate = this.view.newEventStart.value;
            const endDate = this.view.newEventEnd.value;

            if (!eventName || !startDate || !endDate) return;

            const newEvent = await eventlistAPI.addEvent({ eventName, startDate, endDate });

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