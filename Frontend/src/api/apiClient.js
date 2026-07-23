/* ============================================================
   AdStudio · API client
   A tiny fetch wrapper around the single 9090 backend.
   - attaches the JWT from localStorage as "Authorization: Bearer <token>"
   - unwraps the standard ApiResponse envelope { success, data, message }
   ============================================================ */

import { API_BASE } from "./endpoints";

const TOKEN_KEY = "adstudio_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function buildHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Unwrap { success, data, message } -> data, else return body as-is. */
function unwrap(body) {
  if (body && typeof body === "object" && "data" in body && "success" in body) {
    if (body.success === false) {
      throw new Error(body.message || "Request failed");
    }
    return body.data;
  }
  return body;
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      msg = j.message || msg;
    } catch (_) {
      /* ignore */
    }
    throw new Error(msg);
  }
  const text = await res.text();
  if (!text) return null;
  return unwrap(JSON.parse(text));
}

export const apiClient = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) =>
    request(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: (path, body) =>
    request(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: (path, body) =>
    request(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  del: (path) => request(path, { method: "DELETE" }),
};

export default apiClient;
