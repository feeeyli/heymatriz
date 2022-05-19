import { styled } from "@styles";

export const Container = styled("div", {
	$flex: {
		dir: "row",
		wrap: "wrap",
	},
	gap: 64,
	// overflowX: "scroll",
	// width: "95%",
	// scrollbarColor: "$primary #3c3c3c",
});

export const Header = styled("header", {
	$flex: {
		dir: "row",
		justify: "flex-end",
	},
	width: "100%",
	position: "fixed",
	top: 0,
	// background: "$dark",
	padding: 16,
});

export const NewMatrixButton = styled("button", {
	border: 0,
	padding: 16,
	background: "$primary",
	color: "$white",
	aspectRatio: "1 / 1",
	borderRadius: "50%",
	$flex: {
		fullCenter: true,
	},
	position: "fixed",
	bottom: 64,
	right: 32,
});
