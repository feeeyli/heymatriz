import { createStitches } from "@stitches/react";
import { Property } from "@stitches/react/types/css";

type Flex = {
	dir?: Property.FlexDirection;
	align?: Property.AlignItems;
	justify?: Property.JustifyContent;
	wrap?: Property.FlexWrap;
	fullCenter?: boolean;
};

export const { styled, globalCss } = createStitches({
	theme: {
		colors: {
			dark: "#353535",
			white: "#ffffff",
			gray: "#848484",
			primary: "#284b63",
			secondary: "#3c6e71",
		},
	},
	utils: {
		$flex: ({
			dir = "column",
			align = "flex-start",
			justify = "flex-start",
			wrap = "nowrap",
			fullCenter,
		}: Flex) => ({
			display: "flex",
			alignItems: fullCenter ? "center" : align,
			justifyContent: fullCenter ? "center" : justify,
			flexWrap: wrap,
			flexDirection: dir,
		}),
	},
	media: {
		sm: "(max-width: 780px)",
	},
});

export const globalStyles = globalCss({
	"@import":
		"url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap')",

	"*, input, a": {
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
		fontFamily: "Poppins",
	},

	"#root": {
		padding: 32,
		minHeight: "100vh",
		background: "$dark",
		$flex: {
			align: "center",
		},
	},
});
