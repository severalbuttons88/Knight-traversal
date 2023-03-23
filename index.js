const gameBoard = (() => {
  let boardArray = [];
  let boardKnight = null;
  let solutions = [];

  const getSolutions = () => {
    return solutions;
  };
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
  const getBoard = () => {
    return boardArray;
  };
  const generateBoard = (() => {
    const rows = 8;
    const columns = 8;
    const preGenBoardRows = [];

    for (let i = 0; i < rows; i++) {
      preGenBoardRows[i] = [];
      for (let a = 0; a < columns; a++) {
        preGenBoardRows[i][a] = a;
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
    let numberOfVertices = vertexAmount;     //AKA number of nodes
    let adjacentList = new Map(); //lets you store keys to adjacent items
    const addVertex = (vertex) => {
      adjacentList.set(v, []); //Create a adjacent list with an empty array;
    };
    const addEdge = (vertex, targetVertex) => {
      adjacentList.get(vertex).push(targetVertex); //gets vertex and adds a link to target, aka edge
      adjacentList.get(targetVertex).push(vertex); //Puts a link from target to original vertex since there is no direction
    };

    return { numberOfVertices, adjacentList };
  };

  createKnight();
})();
