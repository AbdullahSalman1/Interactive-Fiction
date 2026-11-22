// Page 4 - Player (play.html?story=3)    (owner: Partner B)
//
// STEP 11
// TODO:
//   - read storyId from the URL
//   - POST /plays { storyId } -> a playthrough (remember its id)
//   - render(state): scene title, scene body, one <button> per choice
//   - button click -> disable ALL buttons (no double click!)
//                  -> POST /plays/:playId/choices { choiceId } -> render(newState)
//   - ending scene -> "The End" + link back / "play again"
//
// NEVER send the current scene id to the server. Only the choiceId.
