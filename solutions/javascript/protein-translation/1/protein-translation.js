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

export const translate = (codon="") => {
  const aminoAcid = [];
  for (let index = 0; index < codon.length; index += 3) {
    const element = codon.slice(index, index + 3);
    if (!Object.hasOwn(codons, element)) throw new Error("Invalid codon");
    if (codons[element] === "STOP") break;
    aminoAcid.push(codons[element]);
  }
  return aminoAcid;
};