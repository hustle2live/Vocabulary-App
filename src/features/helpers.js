import { WordStatus, firstIndex, numTestWords } from '../slices/constants.js';

const shuffleAndCut = (arr, numLength = arr.length) => {
   let currentIndex = arr.length,
      randomIndex;
   while (currentIndex !== firstIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
         arr[randomIndex],
         arr[currentIndex],
      ];
   }
   return arr.slice(firstIndex, numLength);
};

const lowerFormatCase = (element) => element.trim().toLowerCase();

const getRandomInt = (max) => Math.floor(Math.random() * max);

const dispatchMultiply = (dispatcher, arrayActions) =>
   arrayActions.forEach((action) => dispatcher(action));

const changewStatusWord = (status) => {
   return status === WordStatus.PRACTICE
      ? WordStatus.ACHIEVED
      : WordStatus.PRACTICE;
};

const fillTestArray = (firstArrr, secondArr, thirdArr, testArr = []) => {
   if (testArr.length === numTestWords) return testArr;
   if (firstArrr.length && firstArrr.length > firstIndex) {
      testArr.push(firstArrr.pop());
   } else if (secondArr.length && secondArr.length > firstIndex) {
      testArr.push(secondArr.pop());
   } else {
      testArr.push(thirdArr.pop());
   }

   return fillTestArray(firstArrr, secondArr, thirdArr, testArr);
};

export {
   shuffleAndCut,
   lowerFormatCase,
   getRandomInt,
   dispatchMultiply,
   changewStatusWord,
   WordStatus,
   numTestWords,
   fillTestArray,
};
