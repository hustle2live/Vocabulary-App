import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Vocabulary } from './components/Vocabulary/Vocabulary';
import { AddWord } from './components/AddWord/AddWord';
import { TestInteractive } from './components/TestInteractive/Test';

import './styles/style.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<Vocabulary />} />
    <Route path='/add-new-word' element={<AddWord />} />
    <Route path='/test-page' element={<TestInteractive />} />
  </Routes>
);

export default App;
