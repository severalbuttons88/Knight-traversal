const gameBoard = (() => {
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
    let currentPosition = [6, 2];
    const setCurrentPosition = (position) => {
      currentPosition = position;
    };
    const getPosition = () => {
      return currentPosition;
    };
    const moveNode = (position) => {
      let value = position;
      let surroundingNode = [];
      return { position, surroundingNode, value };
    };

    const possibleMoves = (currentPosition) => {
      const xMoves = [2, 1, -1, -2, -2, -1, -1, 2];
      const yMoves = [1, 2, 2, 1, -1, -2, -2, -1];
      const xPosition = currentPosition[0];
      const yPosition = currentPosition[1];

      let possibleMoves = [];
      let invalidMove = false;

      for (let i = 0; i < 8; i++) {
        let xCombos = xPosition + xMoves[i];
        let yCombos = xPosition + yMoves[i];

        if (xCombos >= 0 === true && xCombos < 8 === true) {
          let x = xCombos;
          invalidMove = false;
          if (yCombos >= 0 === true && yCombos < 8 === true) {
            let y = yCombos;
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
        invalidMove = false;
      }

      return possibleMoves;
    };
    return { setCurrentPosition, getPosition, possibleMoves, moveNode };
  };
  const createGraph = (start, end) => {
    let graphQueue = queue();
    let nodePaths = [];
    let foundEnd = false;
    let safetyCounter = 0;
    let stringEnd = JSON.stringify(end);

    graphQueue.enqueue(start);
    nodePaths.push(start);
    while (foundEnd === false && graphQueue.isEmpty() === false) {
      if (safetyCounter === 5000) {
        console.log("error");
        break;
      }
      let currentPossibleMoves = boardKnight.possibleMoves(graphQueue.front());

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
  createKnight();
  console.log(createGraph([0, 0], [5, 6]));
})();
