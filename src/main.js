import "./css/style.css";
import { renderLayout } from "./js/ui.js";

const app = document.getElementById("app");

app.innerHTML = renderLayout();
