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
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const paginationEl = document.getElementById("pagination");
paginationEl.classList.add("hidden");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  if (!username) {
    setState({ status: "error", errorMessage: "Enter GitHub username" });
    statusEl.innerHTML = renderStatus(state);
    return;
  }

  setState({ username, page: 1 });
  await loadRepos();
});

async function loadRepos() {
  setState({ status: "loading", errorMessage: "" });
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  statusEl.innerHTML = renderStatus(state);
  reposEl.innerHTML = "";

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
    setState({ status: "error", errorMessage: error.message, repos: [] });
    statusEl.innerHTML = renderStatus(state);
    reposEl.innerHTML = "";
  }

  if (state.username && state.repos.length > 0) {
    paginationEl.classList.remove("hidden");
  } else {
    paginationEl.classList.add("hidden");
  }

  pageInfo.textContent = `Page ${state.page}`;
  prevBtn.disabled = state.page === 1;
  nextBtn.disabled = state.repos.length < state.perPage;
}

prevBtn.addEventListener("click", async () => {
  if (state.page === 1) return;
  setState({ page: state.page - 1 });
  await loadRepos();
});

nextBtn.addEventListener("click", async () => {
  setState({ page: state.page + 1 });
  await loadRepos();
});
