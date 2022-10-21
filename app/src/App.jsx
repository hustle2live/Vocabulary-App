import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Vocabulary } from './components/Vocabulary';
import { NewWordAddition } from './components/NewWordAddition';
import { TestInteractive } from './components/TestInteractive';

import './styles/style.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<Vocabulary />} />
    <Route path='/add-new-word' element={<NewWordAddition />} />
    <Route path='/test-page' element={<TestInteractive />} />
  </Routes>
);

export default App;
