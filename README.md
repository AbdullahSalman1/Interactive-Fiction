# Interactive Fiction

Write and play branching, choose-your-own-adventure stories.
Web Programming 2 - assessed project.

> Everything marked TODO must be filled in before the hand-in (11 December).

## Install and run (from a clean clone)

Requirements: Node.js 20 or newer.

```bash
npm install
cp .env.example .env      # Windows PowerShell: Copy-Item .env.example .env
npm run setup             # creates the SQLite database + example story
npm start                 # http://localhost:3000
```

Run the tests: `npm test`

## Who did what

| | TODO: Partner A name | TODO: Partner B name |
|---|---|---|
| Database | Story, Scene | Choice, Playthrough |
| API | story and scene CRUD, publishing | choices, starting and advancing a play |
| Front | story list, story editor, scene editor | choice editor, player |
| Rule owned | Rule 3 - graph validation | Rule 2 - move legality |

## Level reached

TODO: which level (10 / 13 / 16 / 18) and why.

## Design decisions

- **Start scene:** TODO - `startSceneId` on Story or `isStart` on Scene, and why.
- **Named relations:** TODO - why Choice needs named relations to Scene.
- **409 vs 400 for an illegal move:** TODO
- **onDelete on each relation:** TODO - one line per relation.
- **Deleting a scene that choices point at:** TODO
- **Reachability check:** TODO - algorithm and its cost.

## What does not work

TODO: be honest; declaring a broken feature costs nothing.

## Video

TODO: link or file path.
