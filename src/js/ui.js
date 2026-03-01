export function renderLayout() {
  return `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-4xl font-bold text-blue-400 mb-6">
        RepoFinder
      </h1>

      <form id="searchForm" class="flex gap-2 mb-6">
        <input
          id="usernameInput"
          type="text" 
          placeholder="GitHub username..."
          class="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="searchBtn" type="submit"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium"
        >
          Search
        </button>
      </form>
      <div id="status" class="text-sm text-gray-400 mb-4"></div>
      <div id="repos" class="flex flex-col gap-4"></div>  

    </div>
  `;
}

export function renderStatus(state) {
  if (state.status === "loading") {
    return `<p class="text-sm text-gray-300">Loading...</p>`;
  }

  if (state.status === "error") {
    return `<p class="bg-red-500/10 border border-red-500/30 text-red-200 rounded p-3 text-sm">${state.errorMessage}</p>`;
  }

  return "";
}

export function renderRepos(repos) {
  if (repos.length === 0) {
    return `<div class="text-sm text-gray-400">
    No repositories found. 
    </div>`;
  }

  const resRepos = repos
    .map((repo) => {
      const updated = new Date(repo.updated_at).toLocaleDateString();
      return `<div class="bg-gray-800 border border-gray-700 rounded p-4">
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold text-blue-400">${repo.name}</h3>
    <span class="text-sm text-yellow-400">⭐ ${repo.stargazers_count}</span>
  </div>

  <p class="text-sm text-gray-300 mt-2">
    ${repo.description ?? "No description"}
  </p>

  <div class="mt-3 text-xs text-gray-500">
    Updated: ${updated}
  </div>

  <a href="${repo.html_url}"
     target="_blank"
     rel="noopener noreferrer"
     class="inline-block mt-3 text-sm text-blue-400 hover:underline">
    View on GitHub →
  </a>
</div>`;
    })
    .join("");

  return resRepos;
}
