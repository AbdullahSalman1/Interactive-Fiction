// Everything about errors, in ONE place.
//
// STEP 3 (simple version) / STEP 12 (Prisma codes)
// TODO: export class HttpError extends Error
//         constructor(status, message, details) - so a route can do:
//         throw new HttpError(400, "title is required");
//         throw new HttpError(409, "this story cannot be published", { unreachable, deadEnds });
//
// TODO: export function notFound(req, res)
//         -> res.status(404).json({ error: `no route ${req.method} ${req.path}` })
//
// TODO: export function errorHandler(err, req, res, next)   <- 4 arguments!
//         - HttpError        -> its status, { error: message, details? }
//         - Prisma "P2025"   -> 404  (record not found)      } mapped CENTRALLY
//         - Prisma "P2002"   -> 409  (unique constraint)     } (level 16)
//         - Prisma "P2003"   -> 409  (foreign key) - optional, your call
//         - anything else    -> console.error(err); 500 { error: "internal error" }
//         (Prisma errors have err.code, e.g. err.code === "P2025")
