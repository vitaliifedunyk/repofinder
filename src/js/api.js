export async function fetchRepos({ username, page = 1, perPage = 10 }) {
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", perPage);

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded");
    }

    throw new Error(`Request failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
