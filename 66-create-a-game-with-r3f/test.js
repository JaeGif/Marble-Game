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
      if (tempLives.length > maxLives && tempLives[pointer]) {
        // remove it from arr completely
        tempLives.pop();
      } else if (tempLives[pointer]) {
        tempLives[pointer] = false;
      } else if (!tempLives[pointer]) {
        pointer--;
        continue;
      }

      x++;
    }
  } else if (count > 0) {
    // gain count num of lives added to current arr

    // set pointer to next false value
    let pointer = 0;
    for (let i = 0; i < tempLives.length; i++) {
      if (!tempLives[i]) pointer = i;
    }

    // if array is full trues, set pointer at the ned
    if (pointer === 0) {
      pointer = tempLives.length;
    }

    while (x !== 0) {
      // start from pointer, which is the first false
      if (pointer > tempLives.length - 1) {
        tempLives.push(true);
      } else tempLives[pointer] = true;
      pointer++;
      x--;
    }
  }
  return tempLives;
};

console.log(test(2));
