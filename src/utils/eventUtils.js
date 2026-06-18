import { isToday } from "./dateUtils";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function sortEvents(events) {
  return [...events].sort((left, right) => {
    const leftKey = `${left.date}-${left.startTime}`;
    const rightKey = `${right.date}-${right.startTime}`;
    return leftKey.localeCompare(rightKey);
  });
}

export function filterEvents(events, filters) {
  const searchTerm = filters.search.trim().toLowerCase();
  const dateTerm = filters.date.trim();

  return events.filter((event) => {
    if (filters.category !== "All" && event.category !== filters.category) {
      return false;
    }

    if (dateTerm && event.date !== dateTerm) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const haystack = [
      event.title,
      event.location,
      event.category,
      event.description,
      event.date,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchTerm);
  });
}

export function getAvailableCategories(events) {
  const categories = Array.from(new Set(events.map((event) => event.category)));
  return ["All", ...categories.sort((left, right) => left.localeCompare(right))];
}

export function getEventState(event) {
  if (event.isCancelled) {
    return { label: "Cancelled", tone: "error" };
  }

  if (event.spotsRemaining <= 0) {
    return { label: "Full", tone: "warning" };
  }

  if (isToday(event.date)) {
    return { label: "Today", tone: "success" };
  }

  return { label: `${event.spotsRemaining} spots left`, tone: "info" };
}

export function getTodaysEvents(events) {
  return events.filter((event) => isToday(event.date));
}

export function applyRegistrationsToEvents(baseEvents, registrations) {
  return baseEvents.map((event) => {
    const registeredCount = registrations.filter(
      (registration) => registration.eventId === event.id,
    ).length;

    return {
      ...event,
      spotsRemaining: clamp(event.spotsRemaining - registeredCount, 0, event.capacity),
    };
  });
}
