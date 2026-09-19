# Interaction and state model

Represent behavior as named frames and structured metadata. A state is required when it changes what a user can see, enter, select, confirm, or recover from.

## Minimum state matrix

| Component family | States to consider |
|---|---|
| Inputs | default, focus, filled, invalid, disabled, readOnly |
| Buttons | default, hover, loading, disabled, danger |
| Selectors | default, open, selected, empty, disabled |
| Table/List | loading, populated, empty, error, pagination, selected row |
| Form | untouched, validating, invalid, submitted, server error |
| Modal/Drawer | closed, open, submitting, success, error |
| Upload | idle, uploading, completed, failed |

Use `State · <name>` for state frame names and pair each state with a short note describing the trigger and next action. Keep visual state and runtime state separate: `open: true` is a code property, while the open overlay is a visual state frame.

## Runtime-only behavior

Mark arbitrary callback functions, network requests, timers, browser APIs, and uncontrolled external stores as `runtime-only`. Represent them with a finite preset or a note rather than inventing a visual value.

