import React from 'react';
import { useSelector } from 'react-redux';

export const shuffleAndCut = (arr, num = 10) => {
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex]
    ];
  }
  return arr.slice(0, num);
};

const getRandomAnswers = (arr, testedElement) => {
  const randomAnswers = [testedElement.translate];
  while (randomAnswers.length < 4) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomObj = arr[randomIndex];
    if (!randomAnswers.find((translate) => translate === randomObj.translate))
      randomAnswers.push(randomObj.translate);
  }
  return shuffleAndCut(randomAnswers, 4);
};

export const Testinteractive = (props) => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const testedElement = store.activeWordTest;

  const testedAnswers = getRandomAnswers(vocabulary, testedElement);

  return (
    <div>
      <h1>Hello in Your's OWN DICTIONARY</h1>
      <p>Let's Do Some Exercise Tasks</p>
      <div className='test-container-div'>
        <p className='tested-word'>{testedElement.name}</p>
        <ul className='testUlList'>
          {testedAnswers.map((item) => (
            <li
              className='testLiElement'
              key={item}
              onClick={(e) => {
                props.writeCurrentAnswerStat(
                  e.currentTarget.textContent,
                  testedElement
                );
                props.changeToNextWord();
              }}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
