// Base URL of the Node.js/Express backend.
// Set NEXT_PUBLIC_API_URL in .env.local, e.g.:
//   NEXT_PUBLIC_API_URL=http://localhost:5000
export const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, { cache: "no-store" });
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
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save product");
  }
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export function photoSrc(photoUrl) {
  if (!photoUrl) return "";
  return photoUrl.startsWith("http") ? photoUrl : `${API_URL}${photoUrl}`;
}
