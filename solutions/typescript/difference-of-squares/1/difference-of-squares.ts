export class Squares {
  constructor(private count:number) {}

  get sumOfSquares(): number {
    let sum:number = 0;
    for (let num = 1; num <= this.count; num++) sum += num * num;
    return sum;
  }

  get squareOfSum(): number {
    let sum:number = 0;
    for (let index = 1; index <= this.count; index++) sum += index
    return sum * sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares 
  }
}
