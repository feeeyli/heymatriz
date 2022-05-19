type IMatrix = string | string[][];

interface Operations {
	addition: (m1: string[][], m2: string[][]) => string[][];
	subtraction: (m1: string[][], m2: string[][]) => string[][];
	multiplication: (m1: string[][], m2: string[][]) => string[][];
	division: (m1: string[][], m2: string[][]) => string[][];
}

type OperationsSignals = "+" | "-" | "*" | "/";

type Equation = IMatrix[];

export class MatrixCalculator {
	constructor() {}

	private multiplicationAndDivision(equation: Equation) {
		let solvedEquation: Equation = [];

		equation.forEach((item, index) => {
			if (item === "*" || item === "/") {
				const result = this.operationsWithSignals[item](
					solvedEquation[solvedEquation.length - 1] as string[][],
					equation[index + 1] as string[][]
				);
				solvedEquation.pop();
				solvedEquation.push(result);
			} else if (
				equation[index - 1] !== "*" &&
				equation[index - 1] !== "/"
			) {
				solvedEquation.push(item);
			}
		});

		return solvedEquation;
	}

	operations: Operations = {
		addition: (m1, m2) => {
			if (!m1 || !m2) return [["!err¡"]];

			let result: string[][] = [];

			try {
				m1.forEach((row, i) => {
					result.push([]);

					row.forEach((column, j) => {
						result[result.length - 1].push(
							Number(m1[i][j]) + Number(m2[i][j]) + ""
						);
					});
				});

				return result;
			} catch (error) {
				return [["!err¡"]];
			}
		},
		subtraction: (m1, m2) => {
			if (!m1 || !m2) return [["!err¡"]];

			let result: string[][] = [];

			try {
				m1.forEach((row, i) => {
					result.push([]);

					row.forEach((column, j) => {
						result[result.length - 1].push(
							Number(m1[i][j]) - Number(m2[i][j]) + ""
						);
					});
				});

				return result;
			} catch (error) {
				return [["!err¡"]];
			}
		},
		multiplication: (m1, m2) => {
			if (!m1 || !m2) return [["!err¡"]];

			let result: string[][] = [];

			try {
				m1.forEach((row, i) => {
					result.push([]);

					row.forEach((column, j) => {
						result[result.length - 1].push(
							Number(m1[i][j]) * Number(m2[i][j]) + ""
						);
					});
				});

				return result;
			} catch (error) {
				return [["!err¡"]];
			}
		},
		division: (m1, m2) => {
			if (!m1 || !m2) return [["!err¡"]];

			let result: string[][] = [];

			try {
				m1.forEach((row, i) => {
					result.push([]);

					row.forEach((column, j) => {
						result[result.length - 1].push(
							Number(m1[i][j]) / Number(m2[i][j]) + ""
						);
					});
				});

				return result;
			} catch (error) {
				return [["!err¡"]];
			}
		},
	};

	private operationsWithSignals = {
		"+": this.operations.addition,
		"-": this.operations.subtraction,
		"*": this.operations.multiplication,
		"/": this.operations.division,
	};

	calculate(equation: Equation): string[][] {
		if (equation.includes("/") || equation.includes("*")) {
			equation = this.multiplicationAndDivision(equation);
		}

		let result = equation[0] as string[][];

		equation.forEach((item, index) => {
			if (this.operationsWithSignals[item as OperationsSignals]) {
				result = this.operationsWithSignals[item as OperationsSignals](
					result as string[][],
					equation[index + 1] as string[][]
				);
			}
		});

		if (!result) return [["!err¡"]];

		return result;
	}
}

// const c = new MatrixCalculator();

// let a = [
// 	["1", "2", "3"],
// 	["1", "2", "3"],
// 	["1", "2", "3"],
// ];

// console.log(c.calculate([a, "+", a, "*"]));
