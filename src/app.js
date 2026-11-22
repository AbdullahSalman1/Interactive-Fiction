// Builds the Express app. ORDER MATTERS here (it is a graded item):
//
//   1. express.json()                      - parse JSON bodies into req.body
//   2. express.static("public")            - serve the front end
//   3. the routers, mounted under /api     - stories, scenes, choices, plays
//   4. a final 404 handler                 - nothing matched -> 404 JSON
//   5. the error handler (4 arguments!)    - (err, req, res, next)

//
// Note: this project uses Express 5. If an async route throws (or a Prisma
// call fails), Express 5 sends the error to your error handler by itself -
// no try/catch needed in every route.
//



import express from "express";
import {notFound, errorHandler} from "./errors.js";

export const app = express();

//1. Turn JSON request bodies into req.body
app.use(express.json());

//2. serve the front end: public/index.html is served at "/"
app.use(express.static("public"));


//3. API routes
app.get("/api/health", (req,res) => {
    res.json({ok:true});
});


//4. Nothing matched -> 404 JSON
app.use(notFound);

//5. Errors -> the error handler. Always last
app.use(errorHandler);


// What this means:

// Express checks middlewares in order, top to bottom, for every request.
// A request for /api/health passes through express.json(), isn't a file in public/, matches the health route, and the response is sent.
// A request for /api/nope matches nothing, so it falls through to notFound.
// If notFound were placed before your routes, every request would get a 404. That's why the grading list says "a final 404 layer and an error-handling middleware exist, in that order