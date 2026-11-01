// Mirrors the app's game registry (horus-arcade apps/mobile/src/games/registry.ts):
// same ids, names, taglines, shelves and accents. `howTo` is the one-line
// version of each game's in-app "How to play" screen.

export const SHELVES = [
  { id: "brain", label: "Brain" },
  { id: "puzzle", label: "Puzzle" },
  { id: "arcade", label: "Arcade" },
  { id: "classics", label: "Classics" },
  { id: "word", label: "Word" },
];

export const GAMES = [
  {
    id: "eyecon",
    name: "Eyecon",
    shelf: "brain",
    accent: "#8b5cf6",
    tagline: "Spot the matching symbol first",
    howTo:
      "Any two cards share exactly one symbol. Tap it before Seth, a friend or the clock does.",
  },
  {
    id: "number-stack",
    name: "Number Stack",
    shelf: "puzzle",
    accent: "#2ff4ff",
    tagline: "Merge numbers, chain combos",
    howTo:
      "Drag a tile onto an equal neighbour to merge. Chain merges for up to x5 combos.",
  },
  {
    id: "nova-skim",
    name: "Nova Skim",
    shelf: "arcade",
    accent: "#ff2bd6",
    tagline: "Hop planets, skim the mines",
    howTo:
      "Tap to let go of your orbit and land on the next planet. Skim mines for up to x6.",
  },
  {
    id: "snap-match",
    name: "Snap Match",
    shelf: "brain",
    accent: "#ffd23f",
    tagline: "Memorise the cards, find the pairs",
    howTo:
      "The cards flash face up, then flip. Find every pair before you run out of tries.",
  },
  {
    id: "quick-math",
    name: "Quick Math",
    shelf: "brain",
    accent: "#5dfc8a",
    tagline: "True or false, against the clock",
    howTo: "Is the sum right? Tap True or False. One slip ends the run.",
  },
  {
    id: "odd-one-out",
    name: "Odd One Out",
    shelf: "brain",
    accent: "#ff9f43",
    tagline: "Spot the different shade",
    howTo:
      "Tap the one tile in a different shade. The grid grows and the difference shrinks.",
  },
  {
    id: "echo",
    name: "Echo",
    shelf: "brain",
    accent: "#6ea8ff",
    tagline: "Repeat the growing sequence",
    howTo: "Watch the pads light up, then tap them back. Every round adds one.",
  },
  {
    id: "stack-tower",
    name: "Stack Tower",
    shelf: "arcade",
    accent: "#ff5e7a",
    tagline: "Drop slabs, build it high",
    howTo:
      "Tap to drop the sliding slab. Overhang is cut off; a perfect drop keeps it whole.",
  },
  {
    id: "block-fit",
    name: "Block Fit",
    shelf: "puzzle",
    accent: "#a98bff",
    tagline: "Fit the pieces, clear the lines",
    howTo: "Drag pieces onto the grid. Fill a row or column to clear it.",
  },
  {
    id: "color-sort",
    name: "Color Sort",
    shelf: "puzzle",
    accent: "#ff6bcb",
    tagline: "One colour in every tube",
    howTo:
      "Lift the top ball from one tube and drop it on the same colour or an empty tube.",
  },
  {
    id: "ankh-throw",
    name: "Ankh Throw",
    shelf: "arcade",
    accent: "#ffc94a",
    tagline: "Hit the disc, never an ankh",
    howTo:
      "Tap to throw ankhs into the spinning disc without touching one already stuck.",
  },
  {
    id: "four-in-a-row",
    name: "Four in a Row",
    shelf: "classics",
    accent: "#ff5a5a",
    tagline: "Line up four before they do",
    howTo: "Drop discs into the columns. Play Seth or a friend on one phone.",
  },
  {
    id: "dominoes",
    name: "Dominoes",
    shelf: "classics",
    accent: "#4fe0a0",
    tagline: "Match the ends, empty your hand",
    howTo:
      "Play a tile on a matching end or draw from the pile. Empty your hand first.",
  },
  {
    id: "brick-blitz",
    name: "Brick Blitz",
    shelf: "arcade",
    accent: "#ff8a3d",
    tagline: "Bounce the ball, smash the wall",
    howTo:
      "Drag the paddle, launch, and catch power-ups: multi-ball, fire and lasers.",
  },
  {
    id: "glyph-guess",
    name: "Glyph Guess",
    shelf: "word",
    accent: "#f0c75e",
    tagline: "Find the hidden five-letter word",
    howTo:
      "Six guesses to find the word, in English or Arabic. A new daily word every day.",
  },
  {
    id: "obelisk-flap",
    name: "Obelisk Flap",
    shelf: "arcade",
    accent: "#5ee1ff",
    tagline: "Tap to fly between the obelisks",
    howTo: "Tap to flap. Every obelisk you clear scores; ankhs are a bonus.",
  },
  {
    id: "scarab-dash",
    name: "Scarab Dash",
    shelf: "arcade",
    accent: "#ff7a3d",
    tagline: "Swipe lanes, dodge the boulders",
    howTo: "Swipe between three lanes to dodge boulders and grab ankhs.",
  },
  {
    id: "sand-slide",
    name: "Sand Slide",
    shelf: "arcade",
    accent: "#f3d27a",
    tagline: "Slide the tiles back into place",
    howTo: "The classic 15-puzzle, against the clock. Plus a new board daily.",
  },
  {
    id: "tomb-sweeper",
    name: "Tomb Sweeper",
    shelf: "puzzle",
    accent: "#9fe3b0",
    tagline: "Uncover the tomb, avoid the traps",
    howTo:
      "Clear the tomb without waking a cobra. Your first tap is always safe.",
  },
  {
    id: "senet",
    name: "Senet",
    shelf: "classics",
    accent: "#f2c45c",
    tagline: "The pharaohs' race game, against Seth",
    howTo:
      "Throw the sticks and race five pawns off the board before Seth does.",
  },
  {
    id: "nile-seeds",
    name: "Nile Seeds",
    shelf: "classics",
    accent: "#4fe0c8",
    tagline: "Sow the seeds, empty Seth's side",
    howTo:
      "Mancala on a Nile boat. Sow seeds, earn extra turns and capture his side.",
  },
  {
    id: "kemet-draughts",
    name: "Kemet Draughts",
    shelf: "classics",
    accent: "#ff5fc4",
    tagline: "Jump, crown, and clear the board",
    howTo: "Draughts on 8x8. Jumps are forced and kings are crowned.",
  },
  {
    id: "sphinx-sudoku",
    name: "Sphinx Sudoku",
    shelf: "brain",
    accent: "#c7b4ff",
    tagline: "Every row, column and box, one to nine",
    howTo:
      "Fill the 9x9 grid against the clock, with pencil notes. Three mistakes ends it.",
  },
];
