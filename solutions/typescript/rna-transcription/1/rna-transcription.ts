
const RNA_COMPLEMENT: Record<string, string> = {
  G:"C", C:"G",
  T:"A", A:"U"
}

export function toRna(DNA: string): string {
  return DNA.split("")
    .map((nucleotide) => {
      if (!RNA_COMPLEMENT[nucleotide]) throw new Error("Invalid input DNA.");
      return RNA_COMPLEMENT[nucleotide];
    })
    .join("");
}

