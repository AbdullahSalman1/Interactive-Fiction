// The ONLY place the front end calls fetch. Every page imports from here.
//
// STEP 6
// TODO: export async function api(path, { method = "GET", body } = {})
//   1. const res = await fetch("/api" + path, {
//        method,
//        headers: body ? { "Content-Type": "application/json" } : {},
//        body: body ? JSON.stringify(body) : undefined,
//      });
//   2. if (res.status === 204) return null;      // 204 has NO body - don't parse!
//   3. const data = await res.json();
//   4. if (!res.ok) {                             // fetch does NOT reject on 404/500
//        const err = new Error(data.error || `HTTP ${res.status}`);
//        err.status = res.status;
//        err.details = data.details;              // used by the publish refusal
//        throw err;
//      }
//   5. return data;
