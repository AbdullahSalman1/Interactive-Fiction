// RULE 3 - "a story cannot be published broken".
// This is a PURE function: no database, no Express. Data in, result out.
// That makes it easy to unit-test (tests/graph.test.js).
//
// STEP 13
// TODO: export function validateStoryGraph({ startSceneId, scenes, choices })
//   scenes:  [{ id, title, isEnding }]
//   choices: [{ id, fromSceneId, toSceneId }]
//
//   returns { ok: true }  or
//           { ok: false, details: { missingStart?, unreachable: [{id,title}], deadEnds: [{id,title}] } }
//
//   1. No start scene                       -> problem
//   2. Walk the graph from the start (BFS):
//        queue = [startSceneId], visited = new Set([startSceneId])
//        while queue not empty: take a scene, for each choice leaving it,
//        if its target is not visited -> mark visited, push to queue
//      every scene NOT in visited           -> unreachable
//   3. A scene with no outgoing choice and isEnding === false -> deadEnds
//
//   Cost question at the defence: each scene and each choice is looked at
//   once -> O(scenes + choices). Build a Map fromSceneId -> [choices] first.
