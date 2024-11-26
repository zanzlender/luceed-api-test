export function createBasicAuthHeader(username: string, password: string) {
  // Create base64 encoded credentials
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}

export function TransformDateToDotSeparatedDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day}.${month}.${year}`;
}
