export class Forth {
  constructor() {
    this._stack = []; // We must define these here so they are available to the instance

    this._words = {};

    this.arithmeticOperations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => {
        if (b === 0) throw new Error("Division by zero");
        return Math.floor(a / b);
      },
    };

    this.stackManipulationOperations = {
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
  }

  evaluate(input) {
    const tokens = input
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t !== "");
    this.evaluateTokens(tokens);
  }

  evaluateTokens(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === ":") {
        // parse definition
        i++; // next is name
        if (i >= tokens.length) throw new Error("Invalid definition");
        let name = tokens[i];
        if (/^\d+$/.test(name) || /^-\d+$/.test(name))
          throw new Error("Invalid definition");
        let definition = [];
        i++;
        while (i < tokens.length && tokens[i] !== ";") {
          let t = tokens[i];
          if (this._words[t]) {
            definition.push(...this._words[t]);
          } else {
            definition.push(t);
          }
          i++;
        }
        if (i >= tokens.length || tokens[i] !== ";")
          throw new Error("Invalid definition");
        this._words[name] = definition;
        continue;
      }
      if (this._words[token]) {
        this.evaluateTokens(this._words[token]);
        continue;
      }
      // 1. Check if it's a number
      if (/^-?\d+$/.test(token)) {
        this._stack.push(Number(token));
        continue;
      } // 2. Check arithmetic
      if (this.arithmeticOperations[token]) {
        if (this._stack.length < 2) {
          throw new Error(
            this._stack.length < 1
              ? "Stack empty"
              : "Only one value on the stack",
          );
        }
        const b = this._stack.pop();
        const a = this._stack.pop();
        this._stack.push(this.arithmeticOperations[token](a, b));
        continue;
      }
      if (this.stackManipulationOperations[token]) {
        this.stackManipulationOperations[token](this._stack);
        continue;
      }
      throw new Error("Unknown command");
    }
  }

  get stack() {
    return this._stack;
  }
}
