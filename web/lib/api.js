// Base URL of the Node.js/Express backend.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://stock-book-4.onrender.com";

function getAuthHeaders(includeJson = false) {
  const token = typeof window !== "undefined" ? localStorage.getItem("stockbook-token") : null;
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (includeJson) headers["Content-Type"] = "application/json";
  return headers;
}

export async function login({ username, password }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Login failed");
  }
  return res.json();
}

export async function register({ username, password }) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Registration failed");
  }
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function createProduct({ photoFile, price, name, currency }) {
  const formData = new FormData();
  formData.append("photo", photoFile);
  formData.append("price", price);
  formData.append("name", name || "");
  formData.append("currency", currency || "GBP");

  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save product");
  }
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export function photoSrc(photoUrl) {
  if (!photoUrl) return "";
  return photoUrl.startsWith("http") ? photoUrl : `${API_URL}${photoUrl}`;
}
