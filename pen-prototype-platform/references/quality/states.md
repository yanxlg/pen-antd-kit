# State coverage

Model only states relevant to the flow, but never omit failure paths that block the primary task. Check initial, loading, populated, empty, no-result, validation error, system error, disabled, submitting, success, and permission-denied states. State transitions must preserve context and offer a clear recovery action.
