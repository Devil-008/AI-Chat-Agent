const BASE = "http://127.0.0.1:5000/api/auth";
const CHAT_URL = "http://127.0.0.1:8080/api/chat";

async function request(path, body) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const json = await res
    .json()
    .catch(() => ({ message: "Invalid JSON response" }));
  if (!res.ok) throw json;
  return json;
}

export function login({ email, password }) {
  return request("login", { email, password });
}

export function register({ username, email, password }) {
  return request("register", { username, email, password });
}

export async function logout() {
  // call server logout endpoint
  const res = await fetch(`${BASE}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const json = await res
    .json()
    .catch(() => ({ message: "Invalid JSON response" }));
  return json;
}

export async function chat(message) {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const json = await res.json().catch(() => ({ reply: "" }));
  if (!res.ok) throw json;
  return json;
}

export default { login, register, logout, chat };
