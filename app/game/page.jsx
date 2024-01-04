import Input from "./keyboard/keyboard";
import Grid from "./grid/grid";

import styles from "./styles.module.css";
import GameProvider from "../context/GameProvider";
import Toasts from "../components/toasts/toasts.jsx";
// import UIProvider from '../context/UIProvider';
// import Test from './results/test';
// import Dictionary from '../api/dictionary.jsx';
import Results from "./results/results";
import Help from "./help/help";
import WordData from "../api/worddata";

const Game = () => {
  return (
    <WordData />
  );
};

export default Game;
