// INTEGRATION tests over real HTTP. Run: npm test
//
// STEP 15
// Idea: start the app on a random port, call it with fetch, check the answers.
//
//   import { test, before, after } from "node:test";
//   import assert from "node:assert/strict";
//   import { app } from "../src/app.js";
//   let server, base;
//   before(() => { server = app.listen(0); base = `http://localhost:${server.address().port}/api`; });
//   after(() => server.close());
//
// TODO - the three rules (graded):
//   test("RULE 2: an illegal move -> 409 and the playthrough does not move")
//   test("RULE 1: a choice to a scene of another story -> 400")
//   test("RULE 3: publishing a broken story -> 409 with details.unreachable / deadEnds")
// Plus: GET /api/stories -> 200, unknown id -> 404, DELETE -> 204
