# Kickoff Notes And Project Plan

## Client goals summary

- Make community events easier to discover and register for.
- Reduce manual admin effort around event enquiries and sign-ups.
- Provide an accessible mobile-first MVP that also works well on tablets.
- Keep the build simple and reliable with local event data.

## Target audience

- Local residents who want a simple way to browse council activities
- Council staff demonstrating the MVP during class assessment and handover

## Agreed navigation flow

- `Home` shows the app overview, today's events, and a shortcut into the events list.
- `Events` opens the main list where users can search and filter.
- `Event Details` opens from any event card and shows all key information.
- `Register` opens from event details when spaces are available.
- `Settings` stays available from the bottom navigation for theme, text size, and sound preference.

## MVP features to build first

1. Expo app shell in the root workspace
2. Bottom-tab navigation with nested event stack
3. Event loading from a hardcoded local array
4. Event search and filter experience
5. Registration form with validation and feedback
6. Persistent settings for theme, text size, and sound toggle

## Risks And Unknowns

- The hardcoded event list should stay easy to update without changing the screen flow.
- Tablet layout must stay readable without introducing horizontal scrolling.
- Git evidence and screenshots need to be collected steadily during implementation.

## Technology stack

- Expo 55
- React Native
- React Navigation
- React Native Paper
- AsyncStorage

## Milestone outline

1. Root app normalization and navigation shell
2. Events data layer and hardcoded array setup
3. Core screens and registration flow
4. Settings persistence and responsive polish
5. Testing evidence, README polish, screenshots, and final handover notes
