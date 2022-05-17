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
} from "./styles";
import { styled } from "@styles";
import { Check as CheckIcon, X as XIcon } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { Calculator } from "~/Calculator";

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

export const Matrix = () => {
	const [matrixRows, setMatrixRows] = useState(3);
	const [matrixColumns, setMatrixColumns] = useState(3);
	const [matrix, setMatrix] = useState<string[][]>([]);
	const [formationRule, setFormationRule] = useState("i + j");
	const [mainDiagonal, setMainDiagonal] = useState<string[]>([]);
	const [secondaryDiagonal, setSecondaryDiagonal] = useState<string[]>([]);

	const calculator = new Calculator();

	useEffect(() => {
		let newMatrix: string[][] = [];
		let newMainD: string[] = [];
		let newSecondaryD: string[] = [];

		for (let i = 0; i < matrixRows; i++) {
			newMatrix.push([]);

			for (let j = 0; j < matrixColumns; j++) {
				let itemValue = calculator.calculate(
					formationRule
						.replaceAll("i", String(i + 1))
						.replaceAll("j", String(j + 1))
				);

				newMatrix[i].push(
					isNaN(Number(itemValue)) ? "!err¡" : String(itemValue)
				);
			}
		}

		if (matrixRows === matrixColumns) {
			newMatrix.forEach((row, index) => newMainD.push(row[index]));
			newMatrix.forEach((row, index) =>
				newSecondaryD.push(row[matrixColumns - 1 - index])
			);
		}

		setMainDiagonal(newMainD);
		setSecondaryDiagonal(newSecondaryD);
		setMatrix(newMatrix);
	}, [matrixRows, matrixColumns, formationRule]);

	return (
		<Container>
			<FormationRule
				value={formationRule}
				onChange={(e) => setFormationRule(e.target.value)}
			/>
			<MatrixContainer>
				<MatrixContent
					css={{
						$$columns: matrixColumns,
						$$rows: matrixRows,
					}}
				>
					{matrix.map((row, rowIndex) => (
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
					isTrue={matrix.every((row) =>
						row.every((item) => Number(item) === 0)
					)}
				>
					Matriz Nula
					{matrix.every((row) =>
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
