import React, { createContext, useContext, useEffect, useState } from "react";

import { loadEvents, saveCreatedEvent } from "../services/eventsService";
import { STORAGE_KEYS, readJson, writeJson } from "../services/storage";
import { applyRegistrationsToEvents, sortEvents } from "../utils/eventUtils";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [baseEvents, setBaseEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [dataSource, setDataSource] = useState("local");
  const [endpointMessage, setEndpointMessage] = useState("Checking endpoint...");
  const [remoteSavedCount, setRemoteSavedCount] = useState(0);

  useEffect(() => {
    loadAppEvents();
  }, []);

  async function loadAppEvents(isManualRefresh = false) {
    // Load events, then rebuild the visible list with saved registrations.
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const loadedEvents = await loadEvents();
    const storedRegistrations = await readJson(STORAGE_KEYS.registrations, []);

    setBaseEvents(loadedEvents.events);
    setRegistrations(storedRegistrations);
    setEvents(applyRegistrationsToEvents(loadedEvents.events, storedRegistrations));
    setWarningMessage(loadedEvents.warningMessage);
    setDataSource(loadedEvents.dataSource);
    setEndpointMessage(loadedEvents.endpointMessage);
    setRemoteSavedCount(loadedEvents.remoteSavedCount);
    setIsLoading(false);
    setIsRefreshing(false);
  }

  function hasRegistrationForEvent(eventId) {
    return registrations.some((registration) => registration.eventId === eventId);
  }

  function getEventById(eventId) {
    return events.find((event) => event.id === eventId);
  }

  async function registerForEvent(eventId, formValues) {
    const event = baseEvents.find((item) => item.id === eventId);

    if (!event) {
      return {
        ok: false,
        message: "That event could not be found. Please refresh and try again.",
      };
    }

    if (event.isCancelled) {
      return {
        ok: false,
        message: "Unable to register. This event has been cancelled.",
      };
    }

    if (hasRegistrationForEvent(eventId)) {
      return {
        ok: false,
        message: "You are already registered for this event.",
      };
    }

    const currentEvent = getEventById(eventId);
    if (!currentEvent || currentEvent.spotsRemaining <= 0) {
      return {
        ok: false,
        message: "This event is full. Please choose another one.",
      };
    }

    const nextRegistrations = [
      ...registrations,
      {
        eventId,
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim().toLowerCase(),
        registeredAt: new Date().toISOString(),
      },
    ];

    // Save first so the registration is still there after the app restarts.
    await writeJson(STORAGE_KEYS.registrations, nextRegistrations);

    setRegistrations(nextRegistrations);
    setEvents(applyRegistrationsToEvents(baseEvents, nextRegistrations));

    return {
      ok: true,
      message: `Registration successful. You are booked for ${event.title}.`,
    };
  }

  function createEvent(formValues) {
    // Create a local custom event, then refresh the sorted list shown on screen.
    const capacity = Number(formValues.capacity);
    const eventToAdd = {
      id: `custom-${Date.now()}`,
      title: formValues.title.trim(),
      date: formValues.date.trim(),
      startTime: formValues.startTime.trim() || "09:00",
      endTime: formValues.endTime.trim() || "10:00",
      location: formValues.location.trim(),
      category: formValues.category.trim() || "Community",
      description:
        formValues.description.trim() || "This event was added in the app.",
      capacity,
      spotsRemaining: capacity,
      isCancelled: false,
    };

    saveCreatedEvent(eventToAdd);

    const updatedBaseEvents = sortEvents([...baseEvents, eventToAdd]);
    setBaseEvents(updatedBaseEvents);
    setEvents(applyRegistrationsToEvents(updatedBaseEvents, registrations));

    return {
      ok: true,
      eventId: eventToAdd.id,
      message: "Event added to the local array.",
    };
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        isRefreshing,
        warningMessage,
        dataSource,
        endpointMessage,
        remoteSavedCount,
        refreshEvents: () => loadAppEvents(true),
        registerForEvent,
        createEvent,
        hasRegistrationForEvent,
        getEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);

  if (!value) {
    throw new Error("useEvents must be used inside EventsProvider");
  }

  return value;
}
