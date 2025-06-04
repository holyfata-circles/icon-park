import { useState } from "react";
import IconThreeDGlasses from "@holyfata/icon-park";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<IconThreeDGlasses />
		</div>
	);
}

export default App;
