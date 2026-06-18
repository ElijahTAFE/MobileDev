# Elevate Horizon Connect

Elevate Horizon Connect is a simple React Native and Expo app for browsing local community events. Users can view events, create their own event, open the details page, register for an event, use the account screen, and change a few app settings.

## Target audience

- Community members who want to check local events

## Core features

- Home screen with a summary of current events
- Events list with search, category, and date filters
- Create event form that adds new events to the local array
- Event details screen showing time, place, and spaces left
- Registration form with simple validation
- Account screen with sign-up and sign-in demo states, a guest path to the Events page, and a planned Google sign-in option
- Settings screen for theme, text size, and sound
- Event data loaded from `https://tafeshaun.github.io/elevate-data/events.json` and saved into the local array

## Tech stack

- Expo 55
- React Native
- React Navigation
- React Native Paper
- AsyncStorage for local persistence

## Project structure

```text
src/
  components/
  config/
  context/
  data/
  navigation/
  screens/
  services/
  theme/
  utils/
docs/
```

## Running the app

1. Install dependencies with `npm install`.
2. The app loads events from `https://tafeshaun.github.io/elevate-data/events.json` with a simple HTTP request.
3. Those remote events are copied into the local array, and any created `custom-...` events stay in that array too.
4. Start Expo with `npm start`.

If the remote request fails, the app falls back to the current local array.

## Final verification summary

- `expo-doctor` passed on 2026-06-13 with no issues detected.
- Expo export bundling for iOS completed successfully on 2026-06-13.
- The app includes working navigation, public guest access to the Events page, an account screen with sign-up and sign-in demo states plus a planned Google sign-in path, create-event flow, remote event loading with local fallback, filtering, registration, and settings persistence.
- Final screenshots or demo evidence still need to be added for submission.

## Assessment evidence notes

- Planning notes live in [docs/kickoff-project-plan.md](./docs/kickoff-project-plan.md)
- Collaboration log lives in [docs/collaboration-log.md](./docs/collaboration-log.md)
- UI/wireframe notes live in [docs/wireframe-checklist.md](./docs/wireframe-checklist.md)
- Testing notes live in [docs/testing-checklist.md](./docs/testing-checklist.md)
- Peer review tracking lives in [docs/peer-review-template.md](./docs/peer-review-template.md)
- Final reflection lives in [docs/final-reflection.md](./docs/final-reflection.md)
- Submission manifest lives in [docs/submission-manifest.md](./docs/submission-manifest.md)


