const ANIMALS = [
  {},
  { name: "fly", comment: "" },
  {
    name: "spider",
    comment: "It wriggled and jiggled and tickled inside her.\n",
  },
  { name: "bird", comment: "How absurd to swallow a bird!\n" },
  { name: "cat", comment: "Imagine that, to swallow a cat!\n" },
  { name: "dog", comment: "What a hog, to swallow a dog!\n" },
  { name: "goat", comment: "Just opened her throat and swallowed a goat!\n" },
  { name: "cow", comment: "I don't know how she swallowed a cow!\n" },
  { name: "horse", comment: "She's dead, of course!\n" },
];

const VERSE_START = "I know an old lady who swallowed a <animal>.\n";
const VERSE_END =
  "I don't know why she swallowed the fly. Perhaps she'll die.\n";
const SWALLOW_CHAIN = "She swallowed the <animal> to catch the <animal-1>";
const BIRD_LINE = " that wriggled and jiggled and tickled inside her.\n";

export class Song {
  verse(no) {
    const { name, comment } = ANIMALS[no];
    let start = VERSE_START.replace("<animal>", name) + comment;
    if (name === "horse") return start;
    for (let i = no; i > 1; i--) {
      start += SWALLOW_CHAIN.replace("<animal>", ANIMALS[i].name).replace(
        "<animal-1>",
        ANIMALS[i - 1].name,
      );
      start += ANIMALS[i].name === "bird" ? BIRD_LINE : ".\n";
    }
    start += VERSE_END;
    return start;
  }

  verses(start = 1, end = 8) {
    return Array.from({ length: end - start + 1 })
      .map((_, index) => this.verse(index + start))
      .join("\n")
      .concat("\n");
  }
}
