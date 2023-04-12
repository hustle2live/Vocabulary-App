import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Vocabulary } from './components/Vocabulary/Vocabulary';
import { AddNewWord } from './components/AddNewWord/AddNewWord';
import { TestLogic as Test } from './components/TestLogic/TestLogic';

import './styles.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<Vocabulary />} />
    <Route path='/add-new-word' element={<AddNewWord />} />
    <Route path='/test-page' element={<Test />} />
  </Routes>
);

export default App;
