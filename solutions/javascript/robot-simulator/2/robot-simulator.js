export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || "Invalid Input";
  }
}

const DIRECTIONS = ["north", "east", "south", "west"];

const INSTRUCTION_MAP = {
  L: "turnLeft",
  R: "turnRight",
  A: "advance",
};

export class Robot {
  #bearing = "north";
  #coordinates = [0, 0];

  get bearing() {
    return this.#bearing;
  }

  get coordinates() {
    return this.#coordinates;
  }

  at(x, y) {
    this.#coordinates = [x, y];
    return this;
  }

  orient(direction) {
    if (!DIRECTIONS.includes(direction)) {
      throw new InvalidInputError("Invalid direction");
    }
    this.#bearing = direction;
    return this;
  }

  place({ x, y, direction }) {
    return this.at(x, y).orient(direction);
  }

  evaluate(instructions) {
    [...instructions].forEach((char) => {
      const command = INSTRUCTION_MAP[char];
      if (!command) throw new InvalidInputError("Invalid instruction");

      this[command]();
    });
  }

  #rotate(offset) {
    const currentIndex = DIRECTIONS.indexOf(this.#bearing);
    const newIndex =
      (currentIndex + offset + DIRECTIONS.length) % DIRECTIONS.length;
    this.#bearing = DIRECTIONS[newIndex];
  }

  turnRight() {
    this.#rotate(1);
  }
  turnLeft() {
    this.#rotate(-1);
  }

  advance() {
    const [x, y] = this.#coordinates;
    const movement = {
      north: [x, y + 1],
      east: [x + 1, y],
      south: [x, y - 1],
      west: [x - 1, y],
    };

    const [newX, newY] = movement[this.#bearing];
    return this.at(newX, newY);
  }
}
