const lives = [true, true, false];
const maxLives = 3;
const test = (count) => {
  let x = count;

  let tempLives = [...lives];

  if (count === 0) return tempLives;
  else if (count < 0) {
    // lose lives from current arr
    let pointer = tempLives.length - 1;

    while (x !== 0) {
      //    if false and i is greater than 3, make blue
      //    if false and i less than 3, make hollow

      if (tempLives[pointer]) {
        tempLives[pointer] = false;
      } else if (!tempLives[pointer]) {
        pointer--;
        continue;
      }
      if (tempLives.length > maxLives && tempLives[pointer]) {
        // remove it from arr completely
        tempLives.pop();
      }

      // case for player lost all lives
      if (!tempLives[0]) return 'dead placeholder';

      x++;
    }
  } else if (count > 0) {
    // gain count num of lives added to current arr
    let pointer = 0;
    for (let i = 0; i < tempLives.length; i++) {
      if (!tempLives[i]) pointer = i;
    }

    while (x !== 0) {
      // start from pointer, which is the first false
      tempLives[pointer] = true;
      pointer++;
      x--;
    }
  }
  return tempLives;
};

console.log(test(0));
