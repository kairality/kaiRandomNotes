
// create an empty matrix the same size as the input full of "false"
function prepareNewVisitationRecord(matrix) {
    let rowsM = matrix.length;
    let colsN = matrix[0].length;
    return Array(rowsM).fill()
      .map(() => Array(colsN).fill()
        .map(() => false));
}

// this could be a dict or something huh, but i haven't learned
// js dicts yet and this is fine.
function turnRight(direction) {
    let going = "R";
    switch (direction) {
        case "R": // right
            return "D"
        case "D": // down
            return "L";
        case "L": // left
            return "U";
        case "U": // up
            return "R";
    }
    // could throw an error instead, but not today
    // (nothing will ever pass an invalid input here anyway right???)
    return going;
}

// nothing will call this if i/j aren't valid indices unless
// stuff is borked anyway
function wasVisited(visitationRecord, i, j) {
    return visitationRecord[i][j] === true;
}

// when moving right for example, we should turn when we hit the wall
// or when we hit a column we already spiraled through
// this is when we are at the max j (column) index or when the next
// column in our row is already marked as visited in the visitation record.
// the other directions work similarly.
function shouldTurn(visitationRecord, currI, currJ, direction) {
    let jCols = visitationRecord[0].length;
    let iRows = visitationRecord.length;
    switch (direction) {
        case "R":
            if (currJ === (jCols - 1)) return true;
            if (wasVisited(visitationRecord, currI, currJ + 1)) return true;
            break;
        case "D":
            if (currI === iRows - 1) return true;
            if (wasVisited(visitationRecord, currI + 1, currJ)) return true;
            break;
        case "L":
            if (currJ === 0) return true;
            if (wasVisited(visitationRecord, currI , currJ -1)) return true;
            break;
        case "U":
            if (currI === 0) return true;
            if (wasVisited(visitationRecord, currI - 1, currJ)) return true;
            break;
        default:
            return false;
    }
}

function pickNext(direction, currI, currJ) {
    switch (direction) {
        case "R":
            return [currI, currJ + 1];
        case "D":
            return [currI + 1, currJ];
        case "L":
            return [currI, currJ - 1];
        case "U":
            return [currI - 1, currJ];
        default:
            return [currI, currJ + 1];
    }
}


function spiralOrder(matrix) {
    let record = prepareNewVisitationRecord(matrix);
    let currPos = [0 , 0]
    let currDirection = "R";
    let stopsLeft = matrix.length * matrix[0].length;
    let spiral = [];
    // stopsLeft will decrement as we spiral around the matrix
    // until we have visited every spot.
    while (stopsLeft > 0) {
        let currI = currPos[0];
        let currJ = currPos[1];
        spiral.push(matrix[currI][currJ]);
        record[currI][currJ] = true;
        let turn = shouldTurn(record, currI, currJ, currDirection);
        if (turn === true) currDirection = turnRight(currDirection);
        currPos = pickNext(currDirection, currI, currJ);
        stopsLeft--;
    }
    return spiral;
  }

  // test below


  matrix = [[ 1, 2, 3],
            [ 4, 5, 6],
            [ 7, 8, 9]]

  console.log(spiralOrder(matrix)); // [1,2,3,6,9,8,7,4,5]

  matrix = [[1, 2, 3, 4],
            [5, 6, 7, 8],
            [9,10,11,12]]


  console.log(spiralOrder(matrix)); // [1,2,3,4,8,12,11,10,9,5,6,7]

  matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20]];
  console.log(spiralOrder(matrix));
