import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Interactive.module.scss';

export const Interactive = (props) => {
  const store = useSelector((state) => state);
  const vocabulary = store.vocabulary;

  const testedElement = store.activeWordTest;
  const testedAnswers = props.getRandomAnswers(vocabulary, testedElement);
  const testNumberCount = store.testingArray.length + 1;
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Word learning test</h1>
      <p className={styles.description}>
        choose the correct translation of the word
        <span>Tests left ( {testNumberCount} / 10 ) </span>
      </p>

      <p className={styles['tested-word']}>{testedElement.name}</p>
      <ul className={styles.testUlList}>
        {testedAnswers.map((item) => (
          <li
            className={styles.listElement}
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
