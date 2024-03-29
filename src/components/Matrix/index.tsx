import {
	Container,
	FormationRule,
	MatrixContainer,
	MatrixContent,
	MatrixItem,
	MatrixSizeWrapper,
	MatrixRowColumnInput,
	MatrixIndicatorWrapper,
	MatrixIndicator,
	MatrixDiagonalsWrapper,
	MatrixDiagonal,
	MatrixNameIndicator,
} from "./styles";
import { styled } from "@styles";
import { Check as CheckIcon, X as XIcon } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { Calculator } from "~/Calculator";
import { MatrixCalculator } from "~/MatrixCalculator";

const Brackets = () => {
	const Svg = styled("svg", {
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
	});

	const Rect = styled("rect", {
		fill: "$gray",
	});

	return (
		<Svg>
			<Rect height="2" width="16" />
			<Rect height="100%" width="2" />
			<Rect
				height="2"
				width="16"
				css={{ transform: "translate(0, calc(100% - 2px))" }}
			/>

			<Rect
				height="2"
				width="16"
				css={{ transform: "translate(calc(100% - 16px), 0)" }}
			/>
			<Rect
				height="100%"
				width="2"
				css={{ transform: "translate(calc(100% - 2px), 0)" }}
			/>
			<Rect
				height="2"
				width="16"
				css={{
					transform: "translate(calc(100% - 16px), calc(100% - 2px))",
				}}
			/>
		</Svg>
	);
};

export interface IMatrix {
	letter: string;
	formationRule: string;
	size: {
		row: number;
		column: number;
	};
}

interface MatrixProps {
	matrix: IMatrix;
	matrixs: IMatrix[];
	updateMatrix: (newMatrix: IMatrix) => void;
}

export const Matrix = ({ matrix, updateMatrix, matrixs }: MatrixProps) => {
	const [matrixRows, setMatrixRows] = useState(matrix.size.row);
	const [matrixColumns, setMatrixColumns] = useState(matrix.size.column);
	const [formationRule, setFormationRule] = useState(matrix.formationRule);
	const [mainDiagonal, setMainDiagonal] = useState<string[]>([]);
	const [secondaryDiagonal, setSecondaryDiagonal] = useState<string[]>([]);
	const [resumedMatrix, setResumedMatrix] = useState<string[][]>([]);
	const [renderedMatrix, setRenderedMatrix] = useState<string[][]>([]);

	const calculator = new Calculator();
	const matrixCalculator = new MatrixCalculator();

	function renderMatrix(rows: number, columns: number, formation: string) {
		let newMatrix: string[][] = [];

		for (let i = 0; i < rows; i++) {
			newMatrix.push([]);

			for (let j = 0; j < columns; j++) {
				let itemValue = calculator.calculate(
					formation
						.replaceAll("i", String(i + 1))
						.replaceAll("j", String(j + 1))
				);

				newMatrix[i].push(
					isNaN(Number(itemValue)) ? "!err¡" : String(itemValue)
				);
			}
		}

		return newMatrix;
	}

	useEffect(() => {
		let newMatrix: string[][] = [];
		let newMainD: string[] = [];
		let newSecondaryD: string[] = [];

		if (/^##/g.test(formationRule)) {
			let equation: (string | string[][])[] = formationRule
				.replace("##", "")
				.split(" ");

			"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
				let mat = matrixs.find((mat) => mat.letter === letter);

				if (!mat) return;

				equation.forEach((equationItem, index, arr) => {
					if (equationItem === letter)
						arr[index] = renderMatrix(
							mat!.size.row,
							mat!.size.column,
							mat!.formationRule
						);
				});
			});

			let equationResult = matrixCalculator.calculate(equation);

			if (typeof equationResult === "object") {
				newMatrix = equationResult;
			} else {
				newMatrix = [["!err¡"]];
			}
		} else {
			newMatrix = renderMatrix(matrixRows, matrixColumns, formationRule);
		}

		if (matrixRows === matrixColumns) {
			newMatrix.forEach((row, index) => newMainD.push(row[index]));
			newMatrix.forEach((row, index) =>
				newSecondaryD.push(row[matrixColumns - 1 - index])
			);
		}

		// if (matrixRows >= 6 && matrixColumns >= 6)
		// 	setResumedMatrix([
		// 		[
		// 			newMatrix[0][0],
		// 			newMatrix[0][1],
		// 			newMatrix[0][2],
		// 			newMatrix[0][3],
		// 			"...",
		// 		],
		// 		[
		// 			newMatrix[1][0],
		// 			newMatrix[1][1],
		// 			newMatrix[1][2],
		// 			newMatrix[1][3],
		// 			"...",
		// 		],
		// 		[
		// 			newMatrix[2][0],
		// 			newMatrix[2][1],
		// 			newMatrix[2][2],
		// 			newMatrix[2][3],
		// 			"...",
		// 		],
		// 		[
		// 			newMatrix[3][0],
		// 			newMatrix[3][1],
		// 			newMatrix[3][2],
		// 			newMatrix[3][3],
		// 			"...",
		// 		],
		// 		[
		// 			"...",
		// 			"...",
		// 			"...",
		// 			"...",
		// 			newMatrix[newMatrix.length - 1][
		// 				newMatrix[newMatrix.length - 1].length - 1
		// 			],
		// 		],
		// 	]);

		setMainDiagonal(newMainD);
		setSecondaryDiagonal(newSecondaryD);
		setRenderedMatrix(newMatrix);
		updateMatrix({
			letter: matrix.letter,
			formationRule,
			size: {
				row: matrixRows,
				column: matrixColumns,
			},
		});
	}, [matrixRows, matrixColumns, formationRule]);

	return (
		<Container>
			<FormationRule
				value={formationRule}
				onChange={(e) => setFormationRule(e.target.value)}
			/>
			<MatrixContainer>
				<MatrixNameIndicator>{matrix.letter} =</MatrixNameIndicator>
				<MatrixContent
					css={{
						$$columns: matrixColumns,
						$$rows: matrixRows,
						fontSize: `${
							matrixColumns <= 10
								? 62.5 - (matrixColumns - 6) * 6
								: 38.5
						}%`,
					}}
				>
					{renderedMatrix.map((row, rowIndex) => (
						<Fragment key={rowIndex}>
							{row.map((item, columnIndex) => (
								<MatrixItem
									key={`${rowIndex + 1}${columnIndex + 1}`}
								>
									{item}
								</MatrixItem>
							))}
						</Fragment>
					))}
				</MatrixContent>
				<Brackets />
			</MatrixContainer>
			<MatrixSizeWrapper>
				<MatrixRowColumnInput
					type="number"
					min={1}
					value={matrixRows}
					onChange={(e) => setMatrixRows(Number(e.target.value))}
				/>
				x
				<MatrixRowColumnInput
					type="number"
					min={1}
					value={matrixColumns}
					onChange={(e) => setMatrixColumns(Number(e.target.value))}
				/>
			</MatrixSizeWrapper>
			{matrixRows === matrixColumns && (
				<MatrixDiagonalsWrapper>
					<MatrixDiagonal>
						Diagonal Principal: [ {mainDiagonal.join("; ")} ]
					</MatrixDiagonal>
					<MatrixDiagonal>
						Diagonal Secundaria: [ {secondaryDiagonal.join("; ")} ]
					</MatrixDiagonal>
				</MatrixDiagonalsWrapper>
			)}
			<MatrixIndicatorWrapper>
				<MatrixIndicator isTrue={matrixRows === matrixColumns}>
					Matriz Quadrada
					{matrixRows === matrixColumns ? (
						<CheckIcon weight="bold" />
					) : (
						<CheckIcon weight="bold" />
					)}
				</MatrixIndicator>
				<MatrixIndicator
					isTrue={matrixRows === 1 && matrixColumns === 1}
				>
					Matriz Unitária
					{matrixRows === 1 && matrixColumns === 1 ? (
						<CheckIcon weight="bold" />
					) : (
						<CheckIcon weight="bold" />
					)}
				</MatrixIndicator>
				<MatrixIndicator
					isTrue={renderedMatrix.every((row) =>
						row.every((item) => Number(item) === 0)
					)}
				>
					Matriz Nula
					{renderedMatrix.every((row) =>
						row.every((item) => Number(item) === 0)
					) ? (
						<CheckIcon weight="bold" />
					) : (
						<CheckIcon weight="bold" />
					)}
				</MatrixIndicator>
			</MatrixIndicatorWrapper>
		</Container>
	);
};
