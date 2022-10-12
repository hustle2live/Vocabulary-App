import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();

  const store = props.store;

  const vocabulary = props.vocabulary;
  const count = props.count;

  const testedElement = props.testedElem;

  store.subscribe(() => console.log(testedElement));

  const isCorrectAnswer = (selectedTranslate, testedElement) => {
    if (selectedTranslate === testedElement.translate) {
      dispatch({
        type: 'countInc'
      });
      return 'Awesome, You are WRIGHT !';
    }
    return "You're WRONG ...";
  };

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
                isCorrectAnswer(e.currentTarget.textContent, testedElement);
                console.log(count);
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
