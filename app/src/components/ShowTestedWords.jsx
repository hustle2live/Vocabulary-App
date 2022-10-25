import React from 'react';
import { useSelector } from 'react-redux';

export const ShowTestedWords = (props) => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const testedElement = store.activeWordTest;
  const testedAnswers = props.getRandomAnswers(vocabulary, testedElement);
  const testNumberCount = store.testingArray.length + 1;
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  return (
    <div className='test-interactive'>
      <h1 className='test-interactive__header'>Word learning test</h1>
      <p className='test-interactive__description'>
        choose the correct translation of the word
        <span>Tests left ( {testNumberCount} / 10 ) </span>
      </p>

      <p className='test-interactive__tested-word'>{testedElement.name}</p>
      <ul className='test-interactive__testUlList'>
        {testedAnswers.map((item) => (
          <li
            className='test-interactive__testUlList_listElement show'
            key={item}
            style={{ height: getRandomInt(100) + '%' }}
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
  );
};
