const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
  return response.json();
}