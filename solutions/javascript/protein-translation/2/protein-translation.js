const codons = {
  AUG: "Methionine",     UUU: "Phenylalanine",
  UUC: "Phenylalanine",  UUA: "Leucine",
  UUG: "Leucine",        UCU: "Serine",
  UCC: "Serine",         UCA: "Serine",
  UCG: "Serine",         UGU:"Cysteine",
  UGC:"Cysteine",        UGG:"Tryptophan",
  UAU: "Tyrosine",       UAC: "Tyrosine",
  UAA: "STOP",
  UAG: "STOP",
  UGA: "STOP",
};

function find(codon) {
  return codons[codon] || false;
}

export const translate = (codon) => {
  if (!codon) return [];

  const names = codon.match(/.{1,3}/g).map(find);
  const stop = names.findIndex((n) => n === "STOP");
  const final = stop === -1 ? names : names.slice(0, stop);

  if (final.some((codon) => !codon)) {
    throw new Error("Invalid codon");
  }
  return final;
};
