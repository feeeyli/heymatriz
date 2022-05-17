import { globalStyles } from "@styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

globalStyles();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
