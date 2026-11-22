// Builds the Express app. ORDER MATTERS here (it is a graded item):
//
//   1. express.json()                      - parse JSON bodies into req.body
//   2. express.static("public")            - serve the front end
//   3. the routers, mounted under /api     - stories, scenes, choices, plays
//   4. a final 404 handler                 - nothing matched -> 404 JSON
//   5. the error handler (4 arguments!)    - (err, req, res, next)
//
// STEP 3: write 1, 2, 4, 5 and a test route GET /api/health -> { ok: true }
// STEP 6+: mount the routers one by one as you write them.
//
// Note: this project uses Express 5. If an async route throws (or a Prisma
// call fails), Express 5 sends the error to your error handler by itself -
// no try/catch needed in every route.
//
// TODO: import express from "express";
// TODO: import storiesRouter from "./routes/stories.js";  (etc.)
// TODO: import { errorHandler, notFound } from "./errors.js";
// TODO: export const app = express();
