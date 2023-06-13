import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Theme from "../hooks/Theme";

export default function Switcher() {
	const [colorTheme, setTheme] = Theme();
	const [darkSide, setDarkSide] = useState(
		colorTheme === "light" ? true : false
	);

	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	return (
		<>
			<DarkModeSwitch
				style={{ color: "gray" }}
				checked={darkSide}
				onChange={toggleDarkMode}
				size={30}
			/>
		</>
	);
}
