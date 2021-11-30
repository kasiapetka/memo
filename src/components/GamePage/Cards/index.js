import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import "./Cards.scss";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";
import shuffleArray from "../../../utilities/shuffleArray";
import defaultCards from "./defaultCards";

const Cards = ({
  difficulty,
  addAttempt,
  username,
  calcScore,
  setGameStatus,
  gameStatus,
}) => {
  const history = useHistory();

  const [cardsNumber, setCardsNumber] = useState(0);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isPair, setIsPair] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!username || gameStatus === 2) history.push("/");
    switch (difficulty) {
      case 1:
        return setCardsNumber(12);
      case 2:
        return setCardsNumber(20);
      case 3:
        return setCardsNumber(36);
      default:
        return;
    }
  }, []);

  useEffect(() => {
    const cardsArray = [];
    for (let i = 0; i < cardsNumber / 2; i++) {
      cardsArray.push({ ...defaultCards[i] });
      cardsArray.push({ ...defaultCards[i] });
    }
    shuffleArray(cardsArray);
    setShuffledArray([...cardsArray]);
    setIsShuffled(true);
  }, [isShuffled]);

  useEffect(() => {
    if (flippedCards.length > 2) return;
    if (flippedCards.length === 2) {
      addAttempt();
      if (
        shuffledArray[flippedCards[0]].id === shuffledArray[flippedCards[1]].id
      ) {
        setIsPair(isPair + 1);
      } else {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
          const updateShuffeledArray = [...shuffledArray];
          updateShuffeledArray[flippedCards[0]].isFlipped = false;
          updateShuffeledArray[flippedCards[1]].isFlipped = false;
          setShuffledArray(updateShuffeledArray);
          setIsDisabled(false);
        }, 500);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (isPair === cardsNumber / 2 && isPair) {
      handleGameOver();
    }
  }, [isPair]);

  useEffect(() => {}, [shuffledArray]);

  const handleClick = (i) => {
    if (shuffledArray[i].isFlipped || isDisabled) return;

    if (flippedCards.length === 2) {
      setFlippedCards([i]);
    } else {
      const updateFlippedCards = [...flippedCards, i];
      setFlippedCards(updateFlippedCards);
    }

    const updateShuffeledArray = [...shuffledArray];
    updateShuffeledArray[i].isFlipped = true;
    setShuffledArray(updateShuffeledArray);
  };

  const handleGameOver = () => {
    setGameStatus(2);
    calcScore();
    history.push("/summary");
  };

  const renderCards = () => {
    if (!shuffledArray) return;
    return shuffledArray.map((card, i) => {
      return (
        <div key={i} onClick={() => handleClick(i)}>
          <Card image={card.img} isFlipped={card.isFlipped} />{" "}
        </div>
      );
    });
  };

  return (
    <div
      className={`Cards ${
        difficulty === 3
          ? "Cards__large"
          : difficulty === 2
          ? "Cards__medium"
          : "Cards__small"
      }`}
    >
      {renderCards()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    difficulty: state.game.difficulty,
    attempts: state.game.attempts,
    username: state.game.username,
    gameStatus: state.game.gameStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAttempt: () => dispatch(actions.addAttempt()),
    calcScore: () => dispatch(actions.calcScore()),
    setGameStatus: (status) => dispatch(actions.setGameStatus(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
