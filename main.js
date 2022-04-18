const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
  }

  get field() {
    return this._field;
  }

  print() {
    this._field.forEach((element) => {
      console.log(element.join(''));
    });
  }

  static generateField(width, height, percentage) {
    let mainArr = [];
    let randomArr = [];
    let randomNumberHeight = Math.floor(Math.random() * height);
    let randomNumberWidth = Math.floor(Math.random() * width);

    while (randomArr.length < width) {
      let randomNumer = Math.round(Math.random() * 100);
      const characterGenerate = () => {
        if (randomNumer <= percentage) {
          return hole;
        } else {
          return fieldCharacter;
        }
      };
      randomArr.push(characterGenerate());
      if (randomArr.length === width) {
        mainArr.push(randomArr);
        if (mainArr.length < height) {
          randomArr = [];
        }
      }
    }

    mainArr[0][0] = pathCharacter;

    if (mainArr[randomNumberHeight][randomNumberWidth] === mainArr[0][0]) {
      mainArr[randomNumberHeight + height - 1][randomNumberWidth] = hat;
    } else {
      mainArr[randomNumberHeight][randomNumberWidth] = hat;
    }

    return mainArr;
  }
}

const myField = new Field(Field.generateField(5, 5, 30));

let indexA = 0;

let indexB = 0;

let endGame = false;

myField.print();

while (!endGame) {
  let way = prompt('Wich way?');
  way = way.toLowerCase();
  switch (way) {
    case 'd':
      indexA += 1;
      break;
    case 'u':
      indexA -= 1;
      break;
    case 'l':
      indexB -= 1;
      break;
    case 'r':
      indexB += 1;
      break;
  }

  try {
    switch (myField.field[indexA][indexB]) {
      case hole:
        myField.field[indexA][indexB] = 'X';
        myField.print();
        console.log('You lost :( You fell down on a hole');
        endGame = true;
        break;

      case hat:
        myField.field[indexA][indexB] = 'X';
        myField.print();
        console.log('Congrats! You found your hat!');

        endGame = true;
        break;
    }

    if (myField.field[indexA].length === indexB || indexB === -1) {
      console.log('You lost :( You are out-of-bounds');
      endGame = true;
    } else {
      myField.field[indexA][indexB] = pathCharacter;
    }
  } catch (e) {
    console.log('You lost :( You are out-of-bounds');
    endGame = true;
  }

  if (!endGame) {
    myField.print();
  }
}
