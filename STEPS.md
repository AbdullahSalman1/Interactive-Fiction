# Interactive Fiction: step-by-step manual

Follow the steps **in order**. Each step ends with a **✅ Check**, something you can see working.
Don't start the next step until the check passes. After each check: **commit and push**.

Every file in the project has `TODO` comments with the same step numbers as this manual.

---

## Part 0: Understand the pieces (read once)

```
 Browser (public/)                Server (src/)                     Database
 ─────────────────                ─────────────                     ────────
 index.html + js/pages/*.js  ──fetch──►  Express routes  ──Prisma──►  SQLite file
 (vanilla JavaScript)        ◄──JSON───  (src/routes/*.js)            (dev.db)
```

- **Express** is the web server. It answers URLs like `GET /api/stories` with JSON, and it also serves the files in `public/` to the browser.
- **Prisma** is how the server talks to the database from JavaScript.
- **SQLite** is the database itself: **one file** (`dev.db`), with no server to install.

### ⚠️ No MySQL in this project

You do **not** write SQL and you do **not** paste anything into MySQL. Instead:
1. You describe your tables in `prisma/schema.prisma`.
2. You run `npm run db:migrate`. Prisma **writes the SQL for you** (in `prisma/migrations/.../migration.sql`) and creates the tables inside `dev.db`.
3. To look at your data, run `npm run db:studio`. It opens a web page where you can see and edit your tables, like phpMyAdmin.

---

## Part 1: What to install

| Tool | Why | Status on your PC |
|---|---|---|
| **Node.js** (v20+) | Runs the server and npm | ✅ v24 installed |
| **Git** | Version control | ✅ installed |
| **VS Code** | Editor | ✅ you're using it |
| **GitHub account** (both partners) | Public repository | Create at github.com if needed |
| **Chrome or Firefox** | Dev tools (F12) to watch requests | |
| VS Code extension **Thunder Client** *(optional)* | Send API requests by hand (like Postman) | Install from the Extensions tab |
| VS Code extension **Prisma** *(optional)* | Colors and errors in `schema.prisma` | Install from the Extensions tab |

You do **not** install SQLite, MySQL or Prisma globally. `npm install` puts everything inside the project.

---

## Part 2: Setup (do this once)

### Step 1: Git and GitHub

1. **Fix your Git name** first. It currently looks wrong, and your grade depends on commits being under your name:
   ```bash
   git config --global user.name "Your Real Name"
   git config --global user.email "the-email-of-your-github-account"
   ```
2. Open a terminal **in this project folder** and run:
   ```bash
   git init
   git add .
   git commit -m "Project skeleton"
   ```
   Your `D:\EPITA\III semester` folder is already a Git repository, so you must run `git init` here. That gives this project its own repository.
3. On GitHub, create a **public** repository called `interactive-fiction`, with no README. Then run:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/interactive-fiction.git
   git push -u origin main
   ```
4. On GitHub, go to Settings → Collaborators and add your partner. Your partner then runs `git clone ...` on their PC and does Step 2.

✅ **Check:** the files are visible on GitHub.

### Step 2: Install the packages

```bash
npm install
Copy-Item .env.example .env     # (bash: cp .env.example .env)
```

`.env` holds `DATABASE_URL="file:./dev.db"`. It is **not** committed (it's in `.gitignore`), which is why `.env.example` exists.

✅ **Check:** a `node_modules/` folder appears, and `npx prisma --version` prints version 7.

---

## Part 3: Level 10, "it runs"

### Step 3: The first server ([src/app.js](src/app.js), [src/server.js](src/server.js), [src/errors.js](src/errors.js))

- In `server.js`, start the app.
- In `app.js`, add `express.json()`, `express.static("public")`, a test route `GET /api/health` → `{ ok: true }`, then the 404 handler, then the error handler.
- In `errors.js`, write `HttpError`, `notFound` and `errorHandler`. A simple version is fine for now; you'll add the Prisma codes later.

Run `npm run dev`. It restarts by itself when you save a file.

✅ **Check:** <http://localhost:3000/api/health> shows `{"ok":true}`, <http://localhost:3000/api/nope> shows a 404 JSON, and <http://localhost:3000> shows the Stories page.

### Step 4: The database schema ([prisma/schema.prisma](prisma/schema.prisma))

1. **Decide together: how do you mark the start scene?** `startSceneId` on Story, or `isStart` on Scene? Write the reason in the README now.
2. Fill in the fields for Story, Scene and Choice by following the TODO hints. Choose `onDelete` for each relation, for example: deleting a story deletes its scenes (`Cascade`).
3. Run:
   ```bash
   npm run db:migrate          # name it: init
   ```
4. Open `prisma/migrations/..._init/migration.sql` and **read it**. That is the SQL Prisma wrote for you. You may be asked about it.

✅ **Check:** `npm run db:studio` shows your 3 empty tables. Then commit, **including the `prisma/migrations` folder**.

### Step 5: The seed ([prisma/seed.js](prisma/seed.js))

Create one story with 5–8 scenes and choices. Use your teacher's seed story if one was given.

✅ **Check:** `node prisma/seed.js`, then Prisma Studio shows the data.

### Step 6: First full feature, "list and create stories"

This is the first time data goes all the way from the database to the screen.

1. [src/validation.js](src/validation.js): write `parseId` and `requireString`.
2. [src/routes/stories.js](src/routes/stories.js): write `GET /api/stories` and `POST /api/stories`, and mount the router in `app.js`.
3. [public/js/api.js](public/js/api.js) and [public/js/ui.js](public/js/ui.js): write the fetch wrapper and the three-state helpers.
4. [public/js/pages/storyList.js](public/js/pages/storyList.js): show the list, and make the form create a story.

✅ **Check (Level 10 reached 🎉):**
- the stories show on the page;
- creating one makes it appear;
- an empty title shows the server's error message on screen.

---

## Part 4: Level 13, "a correct API and a usable front end"

### Step 7: The rest of story CRUD

`GET /:id` (with its scenes), `PATCH /:id` and `DELETE /:id` (204, with **no body**).

**How to test an API route without a page:** open the browser at localhost:3000, press F12, go to Console, and type:
```js
await (await fetch("/api/stories/1")).json()
await fetch("/api/stories/1", { method: "PATCH", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ title: "New" }) })
```

✅ **Check:**
- `/api/stories/999` → 404;
- `/api/stories/abc` → 400;
- DELETE → 204.

### Step 8: Scene CRUD

`GET/POST /api/stories/:id/scenes` and `GET/PATCH/DELETE /api/scenes/:id`.

**Decide:** what happens when you delete a scene that choices point at? Either cascade-delete those choices, or refuse with 409. Write the decision in the README.

✅ **Check:** deleting such a scene never gives a 500.

### Step 9: The story editor and scene editor pages

Use [storyEditor.js](public/js/pages/storyEditor.js) and [sceneEditor.js](public/js/pages/sceneEditor.js). Every request must show loading, then the result or an error.

✅ **Check:** you can create a story, add scenes and edit them, all from the browser.

### Step 10: Choices and Rule 1 (Partner B)

Write `POST /api/scenes/:id/choices`, `PATCH/DELETE /api/choices/:id`, and the choice part of the scene editor.

**Rule 1:** load the target scene. If `target.storyId !== fromScene.storyId`, return 400.

✅ **Check:** creating a choice to a scene of **another** story gives 400, and the message is shown on screen.

### Step 11: Playthrough and Rule 2, the player (Partner B)

1. Add the `Playthrough` model to the schema, then run `npm run db:migrate` (name it `add-playthrough`).
2. In [src/routes/plays.js](src/routes/plays.js), write the 3 routes. **Rule 2:** the current scene is read **from the database**, never from the request.
3. In [public/js/pages/player.js](public/js/pages/player.js), show the scene and the choice buttons.

✅ **Check (Level 13 and most of 16):**
- you can play the seed story to an ending;
- in the Console, sending `POST /api/plays/1/choices` with a `choiceId` that doesn't leave the current scene returns **409**;
- `GET /api/plays/1` shows the player did **not** move.

### Step 12: Map the Prisma errors

In `errorHandler`: `err.code === "P2025"` → 404, and `"P2002"` → 409.

✅ **Check:** a PATCH on a missing id returns 404 (not 500).

---

## Part 5: Levels 16–18, "the server owns the truth" and "the graph is validated"

### Step 13: Rule 3, publishing (Partner A)

1. In [src/graph.js](src/graph.js), write `validateStoryGraph`. It walks the graph from the start scene (BFS) and finds unreachable scenes and dead ends.
2. In [tests/graph.test.js](tests/graph.test.js), write unit tests for it. Run `npm test`.
3. Add `POST /api/stories/:id/publish`. It returns 409 plus `details` when the story is broken.
4. In the story editor, the publish button must display the refusal details legibly.

✅ **Check:**
- a story with an orphan scene is refused, and the scene is **named** on screen;
- once fixed, the story publishes.

### Step 14: Pagination and filter

Support `GET /api/stories?page=1&perPage=10&q=cellar&published=true`, with **a maximum on `perPage`** (for example 50). Add Previous/Next buttons on the list page.

✅ **Check:** `?perPage=100000` still returns at most 50.

### Step 15: Integration tests over HTTP

In [tests/api.test.js](tests/api.test.js), write one test per rule: an illegal move gives 409, a cross-story choice gives 400, and a broken publication gives 409.

✅ **Check:** `npm test` is all green. Then break Rule 2 on purpose and check that a test fails. You'll be asked "which test fails if rule 2 is broken?"

### Step 16: Final check

- Fill in **every TODO in README.md**.
- Go through the grading list in the PDF (section 7) line by line.
- **Test a clean clone:** clone the repo into another folder, then run `npm install`, `npm run setup` and `npm start`. Everything must work.

---

## Part 6: Hand-in

### Step 17: The video (3–5 min, in this order)

1. Create a story, a few scenes and the choices.
2. Try to publish and get **refused**, with the unreachable scenes or dead ends shown on screen.
3. Fix the story, then publish successfully.
4. Play a complete playthrough, start to ending.
5. Make an **illegal move** from the F12 Console and show the 409, then call `GET /api/plays/:id` to show the player did not move.

You can record with the Windows Snipping Tool (screen recording) or OBS.

### Step 18: The defense (5 min)

Prepare the PDF's section 10 questions **together**. Each of you must explain the half **you didn't write**.

---

## Rough schedule (deadline: 11 December)

| Dates | Steps | Goal |
|---|---|---|
| 22–24 Nov | 1–6 | Level 10 |
| 25 Nov – 1 Dec | 7–12 | Level 13 and Rule 2 |
| 2–6 Dec | 13–15 | Level 18 |
| 7–9 Dec | 16 | README, clean-clone test, bug fixing |
| 10 Dec | 17–18 | Video, rehearse the questions |

**Bonuses only after Step 16.**

## Everyday workflow

```bash
npm run dev              # server with auto-restart
npm run db:migrate       # after ANY change to schema.prisma
npm run db:studio        # look at the data
npm test                 # run the tests
git add . ; git commit -m "Add POST /api/stories with title validation" ; git push
git pull                 # before you start working (get your partner's work)
```

Commit small and often, with real messages. `git shortlog -sn` is checked.
