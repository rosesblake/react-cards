// did I use useEffect properly?
//i believe we are learning how to move everything into different files soon, but wow it's hard to look at, sorry haha
//did i use too much unnecessary state?
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  async function shuffle() {
    if (!deck || isShuffling) return;
    setIsShuffling(true);
    try {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
      );
      setDeck(res.data);
      setCards([]);
      setError(null);
    } catch (e) {
      console.error("error", e);
    } finally {
      setIsShuffling(false);
    }
  }

  async function drawCard() {
    if (!deck) return;

    try {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );

      if (res.data.cards.length === 0) {
        setError("Error: No cards remaining!");
      } else {
        setCards([...cards, ...res.data.cards]);
      }
    } catch (e) {
      console.error("error", e);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeck(res.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }
    fetchData();
  }, []);

  //how to declutter?
  return (
    <div>
      <button onClick={drawCard} disabled={cards.length === 52 || isShuffling}>
        Draw a Card
      </button>{" "}
      <br />
      <button onClick={shuffle} disabled={isShuffling}>
        Shuffle
      </button>
      {cards.length < 52 && !error ? (
        <div style={{ position: "relative", width: "150px", height: "200px" }}>
          {cards.map((card, index) => (
            <Card key={card.code} card={card} index={index} />
          ))}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default Deck;
