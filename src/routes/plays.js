// Routes for /api/plays    (owner: Partner B)
// THE SERVER OWNS THE GAME STATE. The browser never says which scene it is on.
//
// STEP 11 POST   /api/plays          { storyId }  -> 201 playthrough on the START scene
//            - 404 if story missing, 409/400 if it has no start scene
// STEP 11 GET    /api/plays/:id                   -> 200 { id, scene, choices, isEnding }
// STEP 11 POST   /api/plays/:id/choices { choiceId }
//            RULE 2:
//            - load the playthrough FROM THE DATABASE (its currentSceneId)
//            - load the choice
//            - choice.fromSceneId !== play.currentSceneId -> 409, do NOT move
//            - otherwise update currentSceneId = choice.toSceneId -> 200 new state
