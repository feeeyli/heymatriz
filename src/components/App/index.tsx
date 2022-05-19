import { useState } from "react";
import { IMatrix, Matrix } from "../Matrix";
import { Container, Header, NewMatrixButton } from "./styles";

const ALPHABET = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

export const App = () => {
	const [matrixs, setMatrixs] = useState<IMatrix[]>([
		{
			letter: "A",
			formationRule: "i + j",
			size: {
				row: 3,
				column: 3,
			},
		},
	]);

	function updateMatrix(newMatrix: IMatrix) {
		let newMatrixs: IMatrix[] = [...matrixs];
		const matrixIndex = newMatrixs.findIndex(
			(matrix) => matrix.letter === newMatrix.letter
		);

		newMatrixs[matrixIndex] = newMatrix;

		setMatrixs(newMatrixs);
	}

	return (
		<>
			{/* <Header> */}
			<NewMatrixButton
				onClick={() => {
					setMatrixs((oldMatrixs) => {
						const letter = ALPHABET[oldMatrixs.length];

						if (!letter) return oldMatrixs;

						return [
							...oldMatrixs,
							{
								letter,
								formationRule: "i + j",
								size: {
									row: 3,
									column: 3,
								},
							},
						];
					});
				}}
			>
				+
			</NewMatrixButton>
			{/* </Header> */}
			<Container>
				{matrixs.map((matrix) => (
					<Matrix
						matrix={matrix}
						matrixs={matrixs}
						updateMatrix={updateMatrix}
						key={matrix.letter}
					/>
				))}
			</Container>
		</>
	);
};
