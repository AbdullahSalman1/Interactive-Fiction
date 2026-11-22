// Page 3 - Scene editor (scene.html?id=12)
//
// STEP 9  (owner: Partner A)
// TODO:
//   - GET /scenes/:id -> title, body (textarea), isEnding (checkbox)
//   - set the back link to story.html?id=STORY_ID
//   - save   -> PATCH /scenes/:id
//   - delete -> DELETE /scenes/:id -> back to the story
//
// STEP 10 (owner: Partner B)
//   - list the choices leaving this scene: "label -> target scene title" + delete button
//   - form: label + <select> of the story's scenes (GET /stories/:storyId/scenes)
//       -> POST /scenes/:id/choices { label, toSceneId }
//   - a 400 (target in another story) must show its message on screen
