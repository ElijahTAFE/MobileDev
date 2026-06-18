import {
  addHardcodedEvent as addLocalEvent,
  getHardcodedEvents as getLocalEvents,
  replaceHardcodedEvents as replaceLocalEvents,
} from "../data/mockEvents";
import { sortEvents } from "../utils/eventUtils";

const EVENTS_URL = "https://tafeshaun.github.io/elevate-data/events.json";

function mapRemoteEvent(remoteEvent) {
  return {
    id: String(remoteEvent.id),
    title: remoteEvent.title,
    date: remoteEvent.date,
    startTime: remoteEvent.startTime,
    endTime: remoteEvent.endTime,
    location: remoteEvent.location,
    category: remoteEvent.category,
    description: remoteEvent.description,
    capacity: remoteEvent.capacity,
    spotsRemaining: remoteEvent.spotsRemaining,
    isCancelled: remoteEvent.isCancelled,
  };
}

export async function loadEvents() {
  try {
    // Try the online event file first so the app can use the newest list.
    const response = await fetch(EVENTS_URL);

    if (!response.ok) {
      throw new Error("Could not load remote events.");
    }

    const responseText = await response.text();
    const cleanJsonText = responseText.replace(/^\uFEFF/, "");
    const remoteEvents = JSON.parse(cleanJsonText);
    const mappedEvents = remoteEvents.map(mapRemoteEvent);
    replaceLocalEvents(mappedEvents);

    return {
      events: sortEvents(getLocalEvents()),
      warningMessage: "",
      dataSource: "remote",
      endpointMessage: "Endpoint pull worked",
      remoteSavedCount: mappedEvents.length,
    };
  } catch (error) {
    // If the fetch fails, fall back to the local events already stored in memory.
    return {
      events: sortEvents(getLocalEvents()),
      warningMessage: "Could not load the online events. Showing local events instead.",
      dataSource: "local",
      endpointMessage: "Endpoint pull failed",
      remoteSavedCount: 0,
    };
  }
}

export function saveCreatedEvent(event) {
  addLocalEvent(event);
}
