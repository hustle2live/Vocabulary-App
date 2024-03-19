export const shuffleAndCut = (arr, num = 10) => {
   let currentIndex = arr.length,
      randomIndex;
   while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
         arr[randomIndex],
         arr[currentIndex],
      ];
   }
   return arr.slice(0, num);
};

export const lowerFormatCase = (element) => element.trim().toLowerCase();

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const dispatchMultiply = (dispatcher, arrayActions) =>
   arrayActions.forEach((action) => dispatcher(action));
