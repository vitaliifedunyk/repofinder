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
      <p id="status" class="text-sm text-gray-400 mb-4"></p>
      <div id="repos"></div>  

    </div>
  `;
}
