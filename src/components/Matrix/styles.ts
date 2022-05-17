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

	svg: {
		zIndex: -1,
	},
});

export const MatrixContent = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat($$columns, 1fr)",
	gridTemplateRows: "repeat($$rows, 1fr)",
});

export const MatrixItem = styled("div", {
	padding: 32,
	aspectRatio: 1,
	color: "$white",
	fontSize: 20,
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
