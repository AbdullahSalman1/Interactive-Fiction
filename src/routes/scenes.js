// Routes for /api/scenes    (owner: Partner A, except choices)
//
// STEP 8  GET    /api/scenes/:id               -> 200 scene + its outgoing choices (include the target title)
// STEP 8  PATCH  /api/scenes/:id               -> 200 (title, body, isEnding)
// STEP 8  DELETE /api/scenes/:id               -> 204
//            - what happens to choices POINTING AT this scene? Decide (cascade,
//              or refuse with 409) and explain it in README.md. Not a 500!
// STEP 10 POST   /api/scenes/:id/choices       -> 201 the new choice   (owner: Partner B)
//            - RULE 1: the target scene must be in the SAME story -> else 400
