import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Main } from './components/Main';
import { NewWordAddition } from './components/NewWordAddition';
import { Testinteractive } from './components/TestInteractive';
import './styles.css';

const App = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='add-new-word' element={<NewWordAddition />} />
    <Route path='test-page' element={<Testinteractive />} />
  </Routes>
);

export default App;
