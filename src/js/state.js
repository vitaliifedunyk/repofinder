export const state = {
  username: "",
  page: 1,
  perPage: 10,
  repos: [],
  status: "idle", // 'idle' | 'loading' | 'error'
  errorMessage: "",
};
export function setState(patch) {
  Object.assign(state, patch);
}
