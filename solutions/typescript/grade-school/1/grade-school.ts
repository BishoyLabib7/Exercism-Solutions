export class GradeSchool {
  private rosterByGrade: Record<number, Set<string>> = {};
  private allNames = new Set<string>(); // to avoid duplicate

  add(name: string, grade: number): void {
    if (this.allNames.has(name)) {
      this.allNames.delete(name);
      for (const grade in this.rosterByGrade) {
        this.rosterByGrade[grade].delete(name);
      }
    } else {
      this.allNames.add(name);
      this.rosterByGrade[grade] ??= new Set<string>();
      this.rosterByGrade[grade].add(name);
    }
  }

  roster(): Record<number, string[]> {
    const rosterByGradeCopy: Record<number, string[]> = {};
    for (const grade in this.rosterByGrade) {
      rosterByGradeCopy[grade] = [...this.rosterByGrade[grade]].sort();
    }
    return rosterByGradeCopy;
  }

  grade(grade: number): string[] {
    return [...(this.rosterByGrade[grade] ?? [])].sort() ?? [];
  }
}
