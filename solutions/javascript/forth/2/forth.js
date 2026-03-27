export class Forth {
  #stack = [];
  #words = {};

  static arithmeticOperations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b === 0) throw new Error("Division by zero");
      return Math.floor(a / b);
    },
  };

  static stackManipulationOperations = {
    dup: (stack) => {
      if (stack.length < 1) throw new Error("Stack empty");
      stack.push(stack[stack.length - 1]);
    },
    drop: (stack) => {
      if (stack.length < 1) throw new Error("Stack empty");
      stack.pop();
    },
    swap: (stack) => {
      if (stack.length < 2)
        throw new Error(
          stack.length < 1 ? "Stack empty" : "Only one value on the stack",
        );
      const b = stack.pop();
      const a = stack.pop();
      stack.push(b);
      stack.push(a);
    },
    over: (stack) => {
      if (stack.length < 2)
        throw new Error(
          stack.length < 1 ? "Stack empty" : "Only one value on the stack",
        );
      stack.push(stack[stack.length - 2]);
    },
  };

  evaluate(input) {
    const tokens = input
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t !== "");
    this.#evaluateTokens(tokens);
  }

  #evaluateTokens(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      const number = Number(token);

      // push number if it's integer
      if (Number.isInteger(number)) {
        this.#stack.push(number);
        continue;
      }
      token = token.toLowerCase();

      if (token === ":") {
        i = this.#parseDefinition(tokens, i);
        continue;
      }

      if (this.#words[token]) {
        this.#executeWord(token);
        continue;
      }

      if (Forth.arithmeticOperations[token]) {
        this.#executeArithmetic(token);
        continue;
      }

      if (Forth.stackManipulationOperations[token]) {
        this.#executeStackManipulation(token);
        continue;
      }

      throw new Error("Unknown command");
    }
  }
  #parseDefinition(tokens, startIndex) {
    let name = tokens[startIndex + 1];
    if (!name) throw new Error("Invalid definition");
    name = name.toLowerCase();

    if (/^-?\d+$/.test(name)) throw new Error("Invalid definition");

    const semicolonIndex = tokens.indexOf(";", startIndex + 2);
    if (semicolonIndex === -1) throw new Error("Invalid definition");

    const definition = tokens
      .slice(startIndex + 2, semicolonIndex)
      .map((t) => {
        if (Number.isInteger(Number(t))) return Number(t);
        return t.toLowerCase();
      })
      .flatMap((t) => this.#words[t] || t);

    this.#words[name] = definition;
    return semicolonIndex;
  }

  #executeArithmetic(token) {
    if (this.#stack.length < 2)
      throw new Error(
        this.#stack.length < 1 ? "Stack empty" : "Only one value on the stack",
      );

    const b = this.#stack.pop();
    const a = this.#stack.pop();
    this.#stack.push(Forth.arithmeticOperations[token](a, b));
  }

  #executeStackManipulation(token) {
    Forth.stackManipulationOperations[token](this.#stack);
  }

  #executeWord(token) {
    this.#evaluateTokens(this.#words[token]);
  }

  get stack() {
    return this.#stack;
  }
}
