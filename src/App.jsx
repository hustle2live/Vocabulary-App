import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Vocabulary } from './components/Vocabulary/Vocabulary';
import { AddNewWord } from './components/AddNewWord/AddNewWord';
import { TestLogic as Test } from './components/TestLogic/TestLogic';

import { Header } from './components/Header/Header';

import styles from './styles/styles.module.scss';

import './styles/my-styles.bulma.scss';

const App = () => (
   <div className={styles.main_wrapper}>
      <Header />
      <Routes>
         <Route path="/" element={<Vocabulary />} />
         <Route path="/add-new-word" element={<AddNewWord />} />
         <Route path="/test-page" element={<Test />} />
      </Routes>
   </div>
);

export default App;
