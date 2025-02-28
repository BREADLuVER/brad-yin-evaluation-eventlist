export default class EventlistView {
    constructor() {
        this.eventsList = document.querySelector(".events-list");
        this.newEventForm = document.querySelector(".new-event-form");
        this.newEventTitle = document.querySelector("#new-event-title");
        this.newEventStart = document.querySelector("#new-event-start-date");
        this.newEventEnd = document.querySelector("#new-event-end-date");
        this.addEventBtn = document.querySelector(".add-event-btn");
        this.eventsContainer = document.querySelector(".event-list_items");
        this.closeFormBtn = document.querySelector(".close-form-btn");

        this.addEventBtn.addEventListener("click", () => {
            this.newEventForm.style.display = "block";
        });
        
        this.closeFormBtn.addEventListener("click", () => {
            this.newEventForm.style.display = "none";
        });
    }

    renderEvents(events) {
        this.eventsContainer.innerHTML = "";
        for (const event of events) {
            this.addEvent(event);
        }
    }

    addEvent(newEvent) {
        const { id, eventName, startDate, endDate } = newEvent;
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.id = `event-${id}`;
        eventElement.innerHTML = `
            <span class="event__title">${eventName} (${startDate} - ${endDate})</span>
            <button class="event__delete">Delete</button>
        `;
        this.eventsList.appendChild(eventElement);
    }

    removeEvent(eventId) {
        const eventElement = document.getElementById(`event-${eventId}`);
        if (eventElement) eventElement.remove();
    }
}