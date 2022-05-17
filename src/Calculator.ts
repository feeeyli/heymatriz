interface Operations {
	addition: (n1: number, n2: number) => number;
	subtraction: (n1: number, n2: number) => number;
	multiplication: (n1: number, n2: number) => number;
	division: (n1: number, n2: number) => number;
	potentiation: (n1: number, n2: number) => number;
}

type OperationsSignals = "+" | "-" | "*" | "/" | "**";

type Equation = Array<number | OperationsSignals | string>;

export class Calculator {
	constructor() {}

	private potentiation(equation: Equation) {
		let solvedEquation = [];

		equation.forEach((item, index) => {
			if (item === "**") {
				const result = this.operationsWithSignals[item](
					Number(solvedEquation[solvedEquation.length - 1]),
					Number(equation[index + 1])
				);
				solvedEquation.pop();
				solvedEquation.push(result);
			} else if (equation[index - 1] !== "**") {
				solvedEquation.push(item);
			}
		});

		return solvedEquation;
	}

	private multiplicationAndDivision(equation: Equation) {
		let solvedEquation = [];

		equation.forEach((item, index) => {
			if (item === "*" || item === "/") {
				const result = this.operationsWithSignals[item](
					Number(solvedEquation[solvedEquation.length - 1]),
					Number(equation[index + 1])
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
		addition: (n1, n2) => n1 + n2,
		subtraction: (n1, n2) => n1 - n2,
		multiplication: (n1, n2) => n1 * n2,
		division: (n1, n2) => n1 / n2,
		potentiation: (n1, n2) => n1 ** n2,
	};

	private operationsWithSignals = {
		"+": this.operations.addition,
		"-": this.operations.subtraction,
		"*": this.operations.multiplication,
		"/": this.operations.division,
		"**": this.operations.potentiation,
	};

	calculate(equation: string) {
		const operationsSignals = ["+", "-", "*", "/", "**"];

		let separatedEquation: Equation = equation
			.split(" ")
			.map((item) =>
				operationsSignals.includes(item) ? item : Number(item)
			);

		if (separatedEquation.includes("**"))
			separatedEquation = this.potentiation(separatedEquation);

		if (/\/|\*/g.test(separatedEquation.join(" "))) {
			separatedEquation =
				this.multiplicationAndDivision(separatedEquation);
		}

		let result = separatedEquation[0];

		separatedEquation.forEach((item, index) => {
			if (this.operationsWithSignals[item]) {
				result = this.operationsWithSignals[item](
					result,
					separatedEquation[index + 1]
				);
			}
		});

		return result;
	}
}
