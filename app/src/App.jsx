import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Main } from './components/Main';
import { NewWordAddition } from './components/NewWordAddition';
import { CreateTestingArray } from './components/CreateTestingArray';

import './styles.css';

const App = (props) => {
  // const store = props.store;
  // const state = store.getState();
  // console.log(props.store);

  // const store = useSelector((state) => state);

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='add-new-word' element={<NewWordAddition />} />
      <Route
        path='test-page'
        element={<CreateTestingArray store={props.store} />}
      />
    </Routes>
  );
};

export default App;
