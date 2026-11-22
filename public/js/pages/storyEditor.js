// Page 2 - Story editor (story.html?id=3)    (owner: Partner A)
//
// STEP 9
// TODO:
//   - read id from the URL (getQueryParam("id"))
//   - GET /stories/:id  -> show title, summary, start scene <select> (options = its scenes)
//   - save button       -> PATCH /stories/:id
//   - list scenes       -> links to scene.html?id=SCENE_ID
//   - "new scene" form  -> POST /stories/:id/scenes -> reload
//   - delete story      -> confirm() -> DELETE /stories/:id -> go back to "/"
//
// STEP 13
//   - publish button    -> POST /stories/:id/publish
//       success -> "Published!"
//       409     -> show err.details LEGIBLY:
//                  "Unreachable: The attic (#9)"   "Dead ends: The cellar (#4)"
