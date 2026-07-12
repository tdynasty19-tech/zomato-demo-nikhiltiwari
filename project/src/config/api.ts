export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "https://bitebox-api.example.com").replace(/\/$/, "");

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
