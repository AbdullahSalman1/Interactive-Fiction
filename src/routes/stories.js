// Routes for /api/stories    (owner: Partner A)
//
// import { Router } from "express";
// import { prisma } from "../db.js";
// const router = Router();
// ... routes ...
// export default router;
//
// STEP 6  GET    /api/stories                  -> 200 [stories]
// STEP 6  POST   /api/stories                  -> 201 the new story   (validate title!)
// STEP 7  GET    /api/stories/:id              -> 200 story + its scenes, 404 if missing
// STEP 7  PATCH  /api/stories/:id              -> 200 (title, summary, start scene)
//            - start scene must belong to THIS story -> else 400
// STEP 7  DELETE /api/stories/:id              -> 204, NO body: res.status(204).end()
// STEP 8  GET    /api/stories/:id/scenes       -> 200 [scenes]
// STEP 8  POST   /api/stories/:id/scenes       -> 201 the new scene
// STEP 13 POST   /api/stories/:id/publish      -> 200, or 409 + details (RULE 3, uses graph.js)
// STEP 14 GET    /api/stories?published=&q=&page=&perPage=   (perPage capped, e.g. max 50)
