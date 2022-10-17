export default async function getUsers(url) {
  const response = await fetch(url);

  const json = await response.json();

  return json;
}
