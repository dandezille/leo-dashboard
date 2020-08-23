export async function get(request: RequestInfo): Promise<any> {
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const body = await response.json();
  return body;
}
