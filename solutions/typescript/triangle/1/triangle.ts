export class Triangle {
    private __sides: number[];

   constructor(...sides: number[]) {
    this.__sides = sides;
  }

    private isValid() {
    const [a, b, c] = this.__sides;
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
  }

  get isEquilateral() {
    return this.isValid() && new Set(this.__sides).size === 1;
  }

  get isIsosceles() {
    return this.isValid() && new Set(this.__sides).size <= 2;
  }

  get isScalene() {
    return this.isValid() && new Set(this.__sides).size === 3;
  }
}
