export async function get<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const body = await response.json();
  return body;
}
