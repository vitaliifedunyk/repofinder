import "./css/style.css";
import { renderLayout } from "./js/ui.js";
import { state, setState } from "./js/state.js";
import { fetchRepos } from "./js/api.js";

const app = document.getElementById("app");
app.innerHTML = renderLayout();

const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");

searchBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  if (!username) {
    setState({ status: "error", errorMessage: "Enter GitHub username" });
    statusEl.textContent = state.errorMessage;
    return;
  }

  setState({ username, page: 1, status: "idle", errorMessage: "" });
  statusEl.textContent = `Searching for: ${state.username}`;

  setState({ username, page: 1, status: "loading", errorMessage: "" });
  statusEl.textContent = "Loading...";

  try {
    const repos = await fetchRepos({
      username: state.username,
      page: state.page,
      perPage: state.perPage,
    });

    setState({ repos, status: "idle" });
    statusEl.textContent = `Loaded ${repos.length} repos`;
  } catch (error) {
    setState({ status: "error", errorMessage: error.message });
    statusEl.textContent = state.errorMessage;
  }
});
