import { createStore } from 'redux';
import { dictionary } from '../components/dictionary';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = [...dictionary];

function countUpReducer(
  state = { vocabulary: initialState, activeWordTest: null, count: 0 },
  action
) {
  switch (action.type) {
    case 'addNewWord':
      return { ...state, vocabulary: [...state.vocabulary, action.payload] };
    case 'countInc':
      return { ...state, count: state.count + 1 };
    case 'countReset':
      return { ...state, count: 0 };
    case 'setActiveTestWord':
      return { ...state, activeWordTest: action.payload };
    case 'resetActiveWord':
      return { ...state, activeWordTest: null };
    default:
      return state;
  }
}

export const store = createStore(countUpReducer);
