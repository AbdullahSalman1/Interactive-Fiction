// Page 1 - Story list (index.html)    (owner: Partner A)
//
// STEP 6
// TODO:
//   import { api } from "../api.js";
//   import { showLoading, showError, clearStatus, el } from "../ui.js";
//
//   async function loadStories()
//     showLoading -> api("/stories") -> for each story an <li> with:
//       the title, a "Play" link (play.html?story=ID), an "Edit" link (story.html?id=ID)
//     -> list.replaceChildren(...items); clearStatus
//     catch -> showError
//
//   form "submit" -> event.preventDefault(); disable the button;
//     api("/stories", { method: "POST", body: { title } }) -> reload list
//     catch -> showError (the server's validation message reaches the screen)
//
//   loadStories();
//
// STEP 14: pagination / search controls (?page=, ?q=)
