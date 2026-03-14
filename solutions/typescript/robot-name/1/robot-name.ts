export class Robot {
  private static robotNames = new Set<string>();
  private __name: string;

  constructor() {
    this.__name = this.generateUniqueName();
  }

  public get name(): string {
    return this.__name;
  }

  public resetName(): void {          
    // REMOVE the delete line! 
    // Robot.robotNames.delete(this.__name);
    // We want the name to stay in the Set so it's never picked a  
    this.__name = this.generateUniqueName();
  }

  public static releaseNames(): void {
    Robot.robotNames.clear();
  }

  private generateUniqueName() {
    let newName: string;

    do {
      newName = this.createRandowName();
    } while (Robot.robotNames.has(newName));

    Robot.robotNames.add(newName);

    return newName;
  }

  private createRandowName() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter1 = letters[(Math.random() * 26) | 0];
    const letter2 = letters[(Math.random() * 26) | 0];

    const digitals = ((Math.random() * 1000) | 0).toString().padStart(3, "0");

    return letter1 + letter2 + digitals;
  }
}
