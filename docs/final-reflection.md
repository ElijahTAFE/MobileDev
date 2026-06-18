# Final Reflection

## Project summary

Elevate Horizon Connect was built as an Expo-based council events MVP focused on accessible event browsing and simple registration. The finished app delivers a clear home dashboard, searchable event listings, event detail pages, a registration flow with validation, and locally saved display preferences.

## What went well

- The app structure stayed organised with separate folders for screens, components, context, services, utilities, and theme logic.
- The event data flow was kept simple by using a hardcoded local event array that the app can always rely on.
- Accessibility was considered throughout the interface with scalable text, large touch targets, readable spacing, and light or dark theme support.

## Challenges and fixes

- Hardcoded event data kept the app reliable during development and made the event flow easier to explain.
- Registration needed to stay simple but still prevent incorrect bookings, so validation, duplicate checks, and full-event handling were added.
- The repo originally contained extra reference material and clutter, so it was cleaned to leave the root Expo app as the single build target for handover.

## What I learned

- Context providers made it easier to manage shared event and settings state across multiple screens.
- Small helper functions for event normalisation, filtering, and storage improved readability and made the code easier to explain.
- Handover quality depends on both working code and clear evidence, so documentation and verification notes matter as much as implementation.

## Next improvements

- Capture final screenshots or a short demo recording for submission.
- Record peer feedback and any final changes that come from it.
