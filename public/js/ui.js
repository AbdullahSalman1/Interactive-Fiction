// Helpers for "the three states" (loading / result / error) and the DOM.
//
// STEP 6
// TODO: export function showLoading(statusEl)        -> text "Loading…", class "loading"
// TODO: export function showError(statusEl, err)     -> text err.message, class "error"
// TODO: export function clearStatus(statusEl)        -> empty text, no class
// TODO: export function el(tag, props = {}, ...children)
//         small createElement helper, e.g. el("a", { href: "/x" }, "Edit")
// TODO: export function getQueryParam(name)
//         -> new URLSearchParams(location.search).get(name)
//
// Use textContent, never innerHTML with user text (a scene body could contain <script>).
