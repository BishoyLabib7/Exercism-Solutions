export class Song {
  animalArray = [
    "",
    "fly",
    "spider",
    "bird",
    "cat",
    "dog",
    "goat",
    "cow",
    "horse",
  ];

  comments = {
    spider: "It wriggled and jiggled and tickled inside her.\n",
    bird: "How absurd to swallow a bird!\n",
    cat: "Imagine that, to swallow a cat!\n",
    dog: "What a hog, to swallow a dog!\n",
    goat: "Just opened her throat and swallowed a goat!\n",
    cow: "I don't know how she swallowed a cow!\n",
  };

  verse(animalNumber) {
    const animal = this.animalArray[animalNumber];

    if (animal === "horse") {
      return `I know an old lady who swallowed a horse.
She's dead, of course!
`;
    }

    let song = `I know an old lady who swallowed a ${animal}.\n`;

    if (this.comments[animal]) {
      song += this.comments[animal];
    }
    for (let i = animalNumber; i > 1; i--) {
      let current = this.animalArray[i];
      let prev = this.animalArray[i - 1];

      if (current === "bird") {
        song += `She swallowed the ${current} to catch the ${prev} that wriggled and jiggled and tickled inside her.\n`;
      } else {
        song += `She swallowed the ${current} to catch the ${prev}.\n`;
      }
    }

    song += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
    return song;
  }

  verses(start, end) {
    let result = [];

    for (let i = start; i <= end; i++) {
      result.push(this.verse(i));
    }

return result.map(v => v.trimEnd()).join("\n\n") + "\n\n";  }
}
