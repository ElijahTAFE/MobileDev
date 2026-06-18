const localEvents = [
  {
    id: "101",
    title: "Morning Yoga",
    date: "2025-08-12",
    startTime: "07:30",
    endTime: "08:30",
    location: "Community Hall A",
    category: "Fitness",
    description: "Beginner-friendly yoga session.",
    capacity: 20,
    spotsRemaining: 8,
    isCancelled: false,
  },
  {
    id: "102",
    title: "Trivia Night",
    date: "2025-08-12",
    startTime: "19:00",
    endTime: "21:00",
    location: "Civic Centre",
    category: "Social",
    description: "Teams of 4-6 welcome.",
    capacity: 40,
    spotsRemaining: 22,
    isCancelled: false,
  },
  {
    id: "103",
    title: "Family Movie",
    date: "2025-08-13",
    startTime: "17:30",
    endTime: "19:15",
    location: "Open Air Park",
    category: "Community",
    description: "PG-rated outdoor screening.",
    capacity: 120,
    spotsRemaining: 95,
    isCancelled: false,
  },
  {
    id: "104",
    title: "Acoustic Jam",
    date: "2025-08-14",
    startTime: "18:00",
    endTime: "20:00",
    location: "Studio 2",
    category: "Music",
    description: "Bring an instrument or just listen.",
    capacity: 30,
    spotsRemaining: 12,
    isCancelled: false,
  },
];

export function getHardcodedEvents() {
  return localEvents.map((event) => ({ ...event }));
}

export function addHardcodedEvent(event) {
  localEvents.push({ ...event });
}

export function replaceHardcodedEvents(events) {
  const customEvents = [];

  // Keep custom events so a remote refresh does not wipe out user-made items.
  for (const event of localEvents) {
    if (String(event.id).startsWith("custom-")) {
      customEvents.push(event);
    }
  }

  const nextEvents = [...events, ...customEvents];

  localEvents.length = 0;

  for (const event of nextEvents) {
    localEvents.push({ ...event });
  }
}
