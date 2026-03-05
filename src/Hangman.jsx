import { useEffect, useState } from "react";
import "./Hangman.css";


const images = [
  "/hangman0.png",
  "/hangman1.png",
  "/hangman2.png",
  "/hangman3.png",
  "/hangman4.png",
  "/hangman5.png",
  "/hangman6.png"
];
/* ✅ Hangman images array MUST be here */
const HANGMAN_IMAGES = images;

const WORDS = [
  "INHERITANCE",
  "KUBERNETES",
  "BITBUCKET",
  "BANDWIDTH",
  "SELENIUM",
  "EXCEPTION",
  "THREADING",
  "POLYMORPHISM",
  "DEADLOCK",
  "SERIALIZATION",
  "OPTIMIZATION",
  "LAMBDA",
  "ENCAPSULATION",
  "NAMESPACE",
  "SYNCHRONIZATION " ,
  "PHISHING ",
  "GOLANG",
  "DOCKER",
  "VIRTUALIZATION",
  "QUICKSORT",
  "HEXADECIMAL",
  "CRYPTOGRAPHY",
  "AUTHENTICATION",
  "CONCATENATE",
  "PARADIGM ",
  "ZETTABYTE",
  "MULTITHREADING",
  "MICROSERVICES",
  "COMPLEXITY",
  "ALGORITHM",
  "RECURSIVE",
  "FRAMEWORK",
  "THROUGHPUT",
  "PROTOCOL",
  "FIREWALL",
  "PERIPHERAL",
  "PIPELINING",
  "LOCALHOST",
  "PACKAGE",
  "GITHUB",
  "README",
  "BROWSER",
  "WEBPACK",
  "OPENAI",
  "ROUTER",
  "SCRIPTING",
  "UPLOAD",
  "SPYWARE",
  "DIGITALIZATION",
  "MALWARE",
  "FIRMWARE",
  "HYPERVISOR",
  "VIRTUALMACHINE",
  "CLUSTERING",
  "AGGREGATION",
  "DECOMPRESSION",
  "COMPRESSION",

];

const MAX_LIMBS = 6;
const ALPHABETS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

export default function Hangman() {
  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessed([]);
    setWrong(0);
    setGameOver(false);
    setWinner(false);
  }

  function handleGuess(letter) {
    if (guessed.includes(letter) || gameOver) return;

    const updatedGuessed = [...guessed, letter];
    setGuessed(updatedGuessed);

    if (!word.includes(letter)) {
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong === MAX_LIMBS) {
        setGameOver(true);
      }
    } else {
      const isWinner = word
        .split("")
        .every((char) => updatedGuessed.includes(char));

      if (isWinner) {
        setWinner(true);
        setGameOver(true);
        setScore((prev) => prev + 1);
      }
    }
  }

  function displayWord() {
    return word
      .split("")
      .map((char) => (guessed.includes(char) ? char : "_"))
      .join(" ");
  }

  return (
    <div className="game-wrapper">
      <div className="game-card">
        <h1 className="title">St.Ann's  <br/>Hangman-Game</h1>
        
        <div className="score">Score: {score}</div>

        {/* ✅ Hangman image */}
        <div className="hangman-img">
          <img src={HANGMAN_IMAGES[wrong]} alt="Hangman stage" />
        </div>

        <div className="word">{displayWord()}</div>

        <div className="status">
          Wrong guesses: {wrong} / {MAX_LIMBS}
        </div>

        <div className="buttons">
          {ALPHABETS.map((letter) => (
            <button
              key={letter}
              className="letter-btn"
              disabled={guessed.includes(letter) || gameOver}
              onClick={() => handleGuess(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className={`result ${winner ? "win" : "lose"}`}>
            <h2>{winner ? "🎉 YOU WIN!" : "💀 GAME OVER"}</h2>
            {!winner && <p>Word was: {word}</p>}
            <button className="play-btn" onClick={startGame}>
              Play Again
            </button>
            
          </div>
          
        )}
        <h2 className="title1">Created by Sania & Shaista </h2>
      </div>
    </div>
  );
}
