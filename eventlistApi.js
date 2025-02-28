const eventlistAPI = (() => {
    const EVENT_LIST_API_URL = "http://localhost:3000/events";

    const fetchEvent = async () => {
        const res = await fetch(EVENT_LIST_API_URL);
        return res.json();
    };

    const addEvent = async (eventData) => {
        const res = await fetch(EVENT_LIST_API_URL, {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(eventData)
        });
        return res.json();
    }

    const updateEvent = async(eventID, eventData) => {
        const res = await fetch(`${EVENT_LIST_API_URL}/${eventID}`, {
            method:'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(eventData)
        });
        return res.json();
    }

    const patchEvent = async(eventID, eventData) => {
        const res = await fetch(`${EVENT_LIST_API_URL}/${eventID}`, {
            method:'PATCH',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(eventData)
        });
        return res.json();
    }

    const deleteEvent = async(eventID) => {
        const res = await fetch(`${EVENT_LIST_API_URL}/${eventID}`, {
            method:'DELETE',
        });
        return res.ok;
    }

    return {
        fetchEvent,
        addEvent,
        updateEvent,
        patchEvent,
        deleteEvent,
    }
})();