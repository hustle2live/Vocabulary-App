import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './components/Main';
import { NewWordAddition } from './components/NewWordAddition';
import { CreateTestingArray } from './components/CreateTestingArray';

import './styles/style.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/add-new-word' element={<NewWordAddition />} />
    <Route path='/test-page' element={<CreateTestingArray />} />
  </Routes>
);

export default App;
