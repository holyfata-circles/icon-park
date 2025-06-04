import React from "react";
import ReactDOM from "react-dom/client";
import { Aiming } from "@icon-park/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<div>
			<h1>1</h1>
			{new Array(100).map(() => <Aiming />)}
		</div>
	</React.StrictMode>
);
