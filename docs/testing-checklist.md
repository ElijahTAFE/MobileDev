# Testing Checklist

## Audit method

Local verification done with `expo-doctor` and Expo export bundling.
Statuses below separate code-backed coverage from checks that still need a device or assessor-facing walkthrough.

## Feature checks

| Feature | Pass/Fail | Notes |
| --- | --- | --- |
| Remote event data loads with local fallback | Pass (codebase) | `src/services/eventsService.js` fetches `https://tafeshaun.github.io/elevate-data/events.json`, maps it into the app shape, and falls back to the local array if the request fails. |
| Navigation between all screens | Pass (codebase) | `src/navigation/AppNavigator.js` wires Home, Events, and Settings tabs, with Events list, details, create-event, account, and register screens in the stack flow. |
| Search and filters | Pass (codebase) | `src/screens/EventsListScreen.js` wires keyword, date, and category controls into `filterEvents` from `src/utils/eventUtils.js`. |
| Create event flow | Pass (codebase) | `src/screens/CreateEventScreen.js` validates user input, creates a `custom-...` event through `src/context/EventsContext.js`, and routes to the new event details view. |
| Registration workflow | Pass (codebase) | `src/screens/RegisterScreen.js` and `src/context/EventsContext.js` cover validation, success/error feedback, duplicate prevention, full-event handling, cancelled-event rejection, and saved registrations. |
| Events page visible without login | Pass (codebase) | `src/navigation/AppNavigator.js` keeps `EventsTab` as a top-level tab, and `src/screens/EventsListScreen.js` now explicitly states guest browsing is allowed without signing in. |
| Account screen flow | Pass (codebase) | `src/screens/AccountScreen.js` is connected in navigation and provides sign-up and sign-in demo states, including a planned Google sign-in path without pretending to be a full live account system. |
| Settings persistence | Pass (codebase) | `src/context/SettingsContext.js` reads and writes theme, text scale, and sound settings through AsyncStorage in `src/services/storage.js`. |
| Responsive layout | Partial | Wide-layout branches exist in Home, Events, Event Details, and Settings when `width >= 900`, but this still needs a phone and tablet visual check. |
| Accessibility baseline | Partial | Text scaling, contrast-aware themes, labels, full safe-area edges, and 44px-plus touch targets are present, but final readability still needs a device check. |

## Test evidence to capture

- Screenshot of Home with today's events
- Screenshot of Events list with active filters
- Screenshot of Event Details
- Screenshot of a created custom event opening successfully
- Screenshot of successful registration message
- Screenshot of the account screen with the Gmail option
- Screenshot of Settings in at least one alternate theme or text size
- Screenshot or note showing the remote event load, or the local fallback message if the endpoint is unavailable

