export default class EventlistView {
    constructor() {
        this.newEventForm = document.querySelector(".new-event-form");
        this.newEventTitle = document.querySelector("#new-event-title");
        this.newEventStart = document.querySelector("#new-event-start-date");
        this.newEventEnd = document.querySelector("#new-event-end-date");
        this.addEventBtn = document.querySelector(".add-event-btn");
        this.eventsList = document.querySelector(".event-list_items");
        this.closeFormBtn = document.querySelector(".close-form-btn");

        this.addEventBtn.addEventListener("click", () => {
            delete this.newEventForm.dataset.editingId;
            this.newEventForm.reset();
            this.newEventForm.style.display = "block";
        });

        this.closeFormBtn.addEventListener("click", () => {
            this.newEventForm.style.display = "none";
        });
    }

    renderEvents(events) {
        this.eventsList.innerHTML = ""
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
            <button class="event__edit">Edit</button>
            <button class="event__delete">Delete</button>
        `;
        this.eventsList.appendChild(eventElement);
    }

    removeEvent(eventId) {
        const eventElement = document.getElementById(`event-${eventId}`);
        if (eventElement) eventElement.remove();
    }

    showFormForEdit(event) {
        this.newEventForm.dataset.editingId = event.id;

        this.newEventTitle.value = event.eventName;
        this.newEventStart.value = event.startDate;
        this.newEventEnd.value = event.endDate;

        this.newEventForm.style.display = "block";
    }
}