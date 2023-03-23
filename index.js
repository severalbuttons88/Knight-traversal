const gameBoard = () => {
  let boardArray = [];
  let boardKnight = null;

  const queue = () => {
    let queueStack = [];

    const isEmpty = () => {
      if (queueStack.length === 0) {
        return true;
      }
      return false;
    };

    const getQueue = () => {
      return queueStack;
    };
    const length = () => {
      return queueStack.length;
    };
    const front = () => {
      return queueStack[0];
    };

    const enqueue = (value) => {
      queueStack.push(value);
    };

    const dequeue = () => {
      queueStack.shift();
    };
    const removeQueue = () => {
      queueStack = [];
    };
    //queue returns
    return { getQueue, enqueue, dequeue, isEmpty, front, length, removeQueue };
  };

  function createKnight() {
    boardKnight = knight();
  }

  const generateBoard = (() => {
    const rows = 8;
    const columns = 8;
    const preGenBoardRows = [];


    for (let y = 0; y < rows; y++) {
      for (let c = 0; c < columns; c++) {
        preGenBoardRows.push([y, c]);
      }
    }
    boardArray = preGenBoardRows;
  })();

  const knight = () => {
    let currentPosition = [2, 2]; //knight pos
    const setCurrentPosition = (position) => {
      currentPosition = position;
    };
    const getPosition = () => {
      return currentPosition;
    };

    const possibleMoves = (currentPosition) => {
      const xMoves = [-1, 1, 2, -2, -2, -1, 2, 1];
      const yMoves = [2, 2, 1, 1, -1, -2, -1, -2];
      const xPosition = currentPosition[0];
      const yPosition = currentPosition[1];

      let possibleMoves = [];
      let invalidMove = false;

      for (let i = 0; i < 8; i++) {
        invalidMove = false;
        let xIndex = xMoves[i];
        let yIndex = yMoves[i];
        let xCombos = xPosition + xIndex;
        let yCombos = yPosition + yIndex;

        if (xCombos >= 0 === true && xCombos <= 7 === true) {
          invalidMove = false;
          if (yCombos >= 0 === true && yCombos <= 7 === true) {
            invalidMove = false;
          } else {
            invalidMove = true;
          }
        } else {
          invalidMove = true;
        }

        if (invalidMove === false && xCombos !== -1 && yCombos !== -1) {
          possibleMoves.push([xCombos, yCombos]);
        }
      }

      return possibleMoves;
    };
    return { setCurrentPosition, getPosition, possibleMoves };
  };
  const graph = (vertexAmount) => {
    let numberOfVertices = vertexAmount; //AKA number of nodes
    let adjacentList = new Map(); //lets you store keys to adjacent items
    const addVertex = (vertex, isString = false, optionalValue = []) => {
      if (isString === false) {
        let vertexString = JSON.stringify(vertex);
        adjacentList.set(vertexString, []); //Create a adjacent list with an empty array;
      } else {
        adjacentList.set(vertex, optionalValue);
      }
    };
    const realSearch = (start, end, listTest) => {
      prev = solve(start, end, listTest);
      return reconstructed(start, end, prev);
    };
    function reconstructed(start, end, prev) {
      startData = JSON.stringify(start);
      endData = JSON.stringify(end);
      start;
      let path = [];
      startData = `"${startData}"`;
      let safe = 0;
      let at = endData;
      let firstLoop = true;
      while (at !== null && safe < 10) {
        safe++;
        at = at.replace(/"|'/g, "");

        path.push(at);
        at = prev[at];
      }
      path.reverse();
      return path;
    }
    function solve(start, end, testList) {
      let q = queue();

      let visited = {};
      let startString = JSON.stringify(start);
      q.enqueue(start);
      visited[startString] = true;

      let prev = {};

      let keyVals = adjacentList.keys();
      let count = 0;
      for (l of keyVals) {
        prev[l] = null;
      }
      /*       prev[startString] = startString */
      let safe = 0;
      while (q.isEmpty() === false && safe < 200) {
        safe++;
        vertex = JSON.stringify(q.front());
        q.dequeue();
        let removedQuotes = vertex.replace(/['"]+/g, "");
        let movesAround = adjacentList.get(removedQuotes);
        for (let i in movesAround) {
          let neighbor = movesAround[i];
          if (!visited[neighbor]) {
            q.enqueue(neighbor);
            visited[neighbor] = true;
            prev[neighbor] = vertex;
          }
        }
      }
      return prev;
    }
    const addEdge = (vertex, targetVertex) => {
      let vertexData = JSON.stringify(vertex);
      let targetData = JSON.stringify(targetVertex);
      adjacentList.get(vertexData).push(targetData); //gets vertex and adds a link to target, aka edge
      /*    adjacentList.get(targetData).push(vertexData); */ //Puts a link from target to original vertex since there is no direction
    };

    const movesToEnd = (start, end) => {
      let graphQueue = queue();
      let nodePaths = [];
      let foundEnd = false;
      let safetyCounter = 0;
      let stringEnd = JSON.stringify(end);

      graphQueue.enqueue(start);
      nodePaths.push(start);
      while (foundEnd === false && graphQueue.isEmpty() === false) {
        if (safetyCounter === 5000) {
          break;
        }
        let currentPossibleMoves = boardKnight.possibleMoves(
          graphQueue.front()
        );

        let stringOldMoves = JSON.stringify(nodePaths);

        for (let i = 0; i < currentPossibleMoves.length; i++) {
          let stringMoves = JSON.stringify(currentPossibleMoves[i]);
          if (stringMoves.includes(stringEnd)) {
            nodePaths.push(currentPossibleMoves[i]);
            nodePaths.push(null);
            foundEnd = true;
            break;
          }
          if (stringOldMoves.includes(stringMoves) === false) {
            nodePaths.push(currentPossibleMoves[i]);
            graphQueue.enqueue(currentPossibleMoves[i]);
          }
        }
        graphQueue.dequeue();
      }
      return nodePaths;
    };

    const generateEdges = (board, knight) => {
      for (let i = 0; i < board.length; i++) {
        let currentPositionMoves = knight.possibleMoves(board[i]);
        let currentPosition = board[i];
        for (let j = 0; j < currentPositionMoves.length; j++) {
          addEdge(currentPosition, currentPositionMoves[j]);
        }
      }
    };

    return {
      numberOfVertices,
      adjacentList,
      addEdge,
      addVertex,
      generateEdges,
      realSearch,
      movesToEnd,
    };
  };

  createKnight();
  let boardGraph = graph(64);
  for (index of boardArray) {
    //add board to graph
    boardGraph.addVertex(index);
  }
  boardGraph.generateEdges(boardArray, boardKnight);
  function runPath(start, end) {
    let ranPath = boardGraph.realSearch(start, end);
    let fixedArray = [];
    for (let a = 0; a < ranPath.length; a++) {
      let array = JSON.parse(ranPath[a]);

      for (let n = 0; n < array.length; n++) {
        let val = array[n] + 1;
        array[n] = val;
      }
      fixedArray.push(array);
    }

    let stringToCut = JSON.stringify(fixedArray);
    let result = stringToCut.substring(1, stringToCut.length - 1);
    return result;
  }

  return { runPath };
};
let board1 = gameBoard();
let path = board1.runPath([0, 0], [7, 7]);
console.log(path);
