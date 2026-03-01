import "./css/style.css";
import { renderLayout } from "./js/ui.js";
import { state, setState } from "./js/state.js";
import { fetchRepos } from "./js/api.js";
import { renderStatus } from "./js/ui.js";
import { renderRepos } from "./js/ui.js";

const app = document.getElementById("app");
app.innerHTML = renderLayout();

const usernameInput = document.getElementById("usernameInput");
const statusEl = document.getElementById("status");
const searchForm = document.getElementById("searchForm");
const reposEl = document.getElementById("repos");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  if (!username) {
    setState({ status: "error", errorMessage: "Enter GitHub username" });
    statusEl.innerHTML = renderStatus(state);
    return;
  }

  setState({ username, page: 1, status: "loading", errorMessage: "" });
  statusEl.innerHTML = renderStatus(state);

  try {
    const repos = await fetchRepos({
      username: state.username,
      page: state.page,
      perPage: state.perPage,
    });

    setState({ repos, status: "idle" });
    statusEl.innerHTML = renderStatus(state);
    reposEl.innerHTML = renderRepos(state.repos);
  } catch (error) {
    setState({ status: "error", errorMessage: error.message });
    statusEl.innerHTML = renderStatus(state);
  }
});
