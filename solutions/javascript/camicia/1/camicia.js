const PAYMENT_CARDS = {
  J: 1,
  Q: 2,
  K: 3,
  A: 4,
};

const normalizeDeck = (deck) =>
  deck.map((card) => (PAYMENT_CARDS[card] ? card : "N")).join("");


const encodeState = (currentPlayer, playerA, playerB) => {
  const turn = currentPlayer === playerA ? "A" : "B";
  return turn + normalizeDeck(playerA) + "|" + normalizeDeck(playerB);
};

const isLoopDetected = (seenStates, state) => seenStates.has(state);

const recordState = (seenStates, state) => seenStates.add(state);

const awardPile = (winner, pile) => {
  winner.push(...pile);
  pile.length = 0;
};

const resolvePenaltyChallenge = (
  challenger,
  responder,
  pile,
  initialPenalty,
) => {
  let penalty = initialPenalty;
  let cardsPlayed = 0;

  while (penalty > 0) {
    if (responder.length === 0) {
      awardPile(challenger, pile);
      return { challenger, responder, cardsPlayed, challengerWins: true };
    }

    const payCard = responder.shift();
    pile.push(payCard);
    cardsPlayed++;

    if (PAYMENT_CARDS[payCard]) {
      penalty = PAYMENT_CARDS[payCard];
      [challenger, responder] = [responder, challenger];
    } else {
      penalty--;
    }
  }

  awardPile(challenger, pile);
  return { challenger, responder, cardsPlayed, challengerWins: true };
};

// Game Orchestration
export const simulateGame = (playerA, playerB) => {
  const pile = [];
  let cardsPlayed = 0;
  let tricks = 0;
  const seenStates = new Set();

  let currentPlayer = playerA;
  let otherPlayer = playerB;

  while (currentPlayer.length > 0 || pile.length > 0) {
    if (currentPlayer.length === 0) {
      if (pile.length > 0) {
        awardPile(otherPlayer, pile);
        tricks++;
      }
      break;
    }

    if (pile.length === 0) {
      if (otherPlayer.length === 0) break;

      const state = encodeState(currentPlayer, playerA, playerB);
      if (isLoopDetected(seenStates, state)) {
        return { status: "loop", cards: cardsPlayed, tricks };
      }
      recordState(seenStates, state);
    }

    const card = currentPlayer.shift();
    pile.push(card);
    cardsPlayed++;

    if (PAYMENT_CARDS[card]) {
      const result = resolvePenaltyChallenge(
        currentPlayer,
        otherPlayer,
        pile,
        PAYMENT_CARDS[card],
      );
      currentPlayer = result.challenger;
      otherPlayer = result.responder;
      cardsPlayed += result.cardsPlayed;
      tricks++;
    } else {
      [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
    }
  }

  return { status: "finished", cards: cardsPlayed, tricks };
};
