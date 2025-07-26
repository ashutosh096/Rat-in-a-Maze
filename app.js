import React, { useState } from 'react';
import './App.css';

const N = 5;

const createInitialMaze = () => Array(N).fill(0).map(() => Array(N).fill(0));

const isSafe = (maze, x, y, visited) => (
  x >= 0 && y >= 0 && x < N && y < N && maze[x][y] === 0 && !visited[x][y]
);

const solveMazeUtil = (maze, x, y, visited, path, setPath) => {
  if (x === N - 1 && y === N - 1) {
    path.push([x, y]);
    setPath([...path]);
    return true;
  }

  if (isSafe(maze, x, y, visited)) {
    visited[x][y] = true;
    path.push([x, y]);

    const directions = [
      [1, 0], // down
      [0, 1], // right
      [-1, 0], // up
      [0, -1] // left
    ];

    for (let [dx, dy] of directions) {
      if (solveMazeUtil(maze, x + dx, y + dy, visited, path, setPath)) {
        return true;
      }
    }

    path.pop();
    visited[x][y] = false;
  }

  return false;
};

function App() {
  const [maze, setMaze] = useState(createInitialMaze());
  const [path, setPath] = useState([]);

  const toggleWall = (x, y) => {
    const newMaze = maze.map(row => [...row]);
    newMaze[x][y] = newMaze[x][y] === 0 ? 1 : 0;
    setMaze(newMaze);
  };

  const solveMaze = () => {
    const visited = Array(N).fill(0).map(() => Array(N).fill(false));
    setPath([]);
    solveMazeUtil(maze, 0, 0, visited, [], setPath);
  };

  return (
    <div className="App">
      <h2>Rat in a Maze Visualizer</h2>
      <div className="maze">
        {maze.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => {
              const isInPath = path.some(([x, y]) => x === i && y === j);
              return (
                <div
                  key={j}
                  className={`cell ${cell === 1 ? 'wall' : ''} ${isInPath ? 'path' : ''}`}
                  onClick={() => toggleWall(i, j)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={solveMaze}>Solve Maze</button>
    </div>
  );
}

export default App;
