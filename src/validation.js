// Small helpers so every route validates input the same way.
// Remember: req.params and req.query are ALWAYS strings. "7" is not 7.
//
// STEP 6
// TODO: export function parseId(value, name = "id")
//         - Number(value); if not a positive integer -> throw new HttpError(400, `${name} must be a positive integer`)
//         - return the number
//
// TODO: export function requireString(value, name, { max = 200 } = {})
//         - must be a string, trimmed, not empty, not longer than max -> else 400
//         - return the trimmed string
//
// TODO: export function optionalBoolean(value, name)
//         - undefined is fine; otherwise must be true/false -> else 400
