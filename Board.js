import { View, StyleSheet, Text, Pressable } from "react-native";
import { useState } from 'react';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isTie, setIsTie] = useState(false);


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isTie) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);

    // Check for a tie
  if (nextSquares.every((square) => square)) {
    setIsTie(true);
  }
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsTie(false);
  }

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <View>
      <View style={styles.text}>
        <Text style={styles.text}>{status}</Text>
      </View>
      <View style={styles.boardBase}>
        <View style={styles.boardRow}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </View>
        <View style={styles.boardRow}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </View>
        <View style={styles.boardRow}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </View>
      </View>
      {( winner ||  isTie) && (
        <Pressable style={styles.button} onPress={resetBoard}>
          <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Start A New Game</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
  
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = ({value, onSquareClick}) => {
  return (
    <Pressable style={styles.square} onPress={onSquareClick}>
      <Text style={styles.symbol}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boardBase: {
    width: "90%",
    aspectRatio: 1,
    borderWidth: 1,
  },
  boardRow: {
    flexDirection: "row",
    flex: 1,
  },
  square: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontSize: 70,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  button: {
    position: 'absolute',
    bottom: -150, // Adjust this value to position the button might look wonky on dif phones tho
    left: '25%',
    transform: [{ translateX: -50 }], 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonWrapper: {
    backgroundColor: 'azure',
    padding: 10,
    margin: 30,
    borderRadius: 5,
  },
});
