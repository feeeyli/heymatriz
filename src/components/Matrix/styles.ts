import { styled } from "@styles";

export const Container = styled("div", {
	$flex: {
		align: "center",
	},
	gap: 32,
});

export const FormationRule = styled("input", {
	border: "1px solid $gray",
	background: "transparent",
	borderRadius: 2,
	padding: 8,
	color: "$white",
	outline: "none",

	"&:focus": {
		boxShadow: "0 0 0 4px #353535, 0 0 0 8px #284b63",
	},
});

export const MatrixContainer = styled("div", {
	position: "relative",
});

export const MatrixContent = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat($$columns, 1fr)",
	gridTemplateRows: "repeat($$rows, 1fr)",
	fontSize: "62.5%",
});

export const MatrixItem = styled("div", {
	padding: "28px",
	fontSize: "22px",

	"@sm": {
		padding: "1em",
		fontSize: "1.8em",
	},

	aspectRatio: 1,
	color: "$white",
	$flex: {
		fullCenter: true,
	},
});

export const MatrixSizeWrapper = styled("div", {
	color: "$white",
	$flex: {
		dir: "row",
		align: "center",
	},
	gap: 12,
});

export const MatrixRowColumnInput = styled("input", {
	border: "1px solid $gray",
	background: "transparent",
	borderRadius: 2,
	padding: 8,
	color: "$white",
	outline: "none",
	width: 64,

	"&:focus": {
		boxShadow: "0 0 0 4px #353535, 0 0 0 8px #284b63",
	},
});

export const MatrixIndicatorWrapper = styled("div", {
	$flex: {},
	gap: 16,
});

export const MatrixIndicator = styled("div", {
	$flex: {
		dir: "row",
		align: "center",
	},
	gap: 8,
	fontSize: 18,

	variants: {
		isTrue: {
			true: {
				color: "#06d6a0",
				opacity: 1,
			},
			false: {
				color: "$white",
				opacity: 0.2,
			},
		},
	},
});

export const MatrixDiagonalsWrapper = styled("div", {});

export const MatrixDiagonal = styled("div", {
	color: "$white",
});

export const MatrixNameIndicator = styled("span", {
	position: "absolute",
	top: 8,
	left: -16,
	transform: "translateX(-100%)",
	color: "$white",
});
