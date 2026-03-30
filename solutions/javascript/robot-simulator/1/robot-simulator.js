export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || "Invalid Input";
  }
}

const directions = ["north", "east", "south", "west"];

export class Robot {
  #bearing = "north";
  #coordinates = [0, 0];

  get bearing() {
    return this.#bearing;
  }

  get coordinates() {
    return this.#coordinates;
  }

  place({ x, y, direction }) {
    this.#coordinates = [x, y];
    if (!directions.includes(direction)) {
      throw new InvalidInputError("Invalid direction");
    }
    this.#bearing = direction;
  }

  evaluate(instructions) {
    instructions.split("").forEach((instruction) => {
      switch (instruction) {
        case "R":
          this.#turnRight();
          break;
        case "L":
          this.#turnLeft();
          break;
        case "A":
          this.#advance();
          break;
        default:
          throw new InvalidInputError("Invalid instruction");
      }
    });
  }

  #turnRight() {
    this.#bearing =
      directions[(directions.indexOf(this.#bearing) + 1) % directions.length];
  }

  #turnLeft() {
    this.#bearing =
      directions[(directions.indexOf(this.#bearing) + 3) % directions.length];
  }

  #advance() {
    switch (this.#bearing) {
      case "north":
        this.#coordinates[1] += 1;
        break;
      case "east":
        this.#coordinates[0] += 1;
        break;
      case "south":
        this.#coordinates[1] -= 1;
        break;
      case "west":
        this.#coordinates[0] -= 1;
        break;
    }
  }
}
