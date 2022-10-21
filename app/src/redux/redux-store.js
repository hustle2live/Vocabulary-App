import { createStore } from 'redux';
import { dictionary } from '../components/dictionary';
import { shuffleAndCut } from '../components/helpers';

const initialState = {
  vocabulary: [...dictionary],
  activeWordTest: '',
  count: 0,
  testingArray: [],
  statArrayCurrent: [],
  stats: []
};

function countUpReducer(state, action) {
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
    case 'startNewTest':
      return {
        ...state,
        testingArray: shuffleAndCut([...state.vocabulary]),
        count: 0,
        statArrayCurrent: []
      };
    case 'changeToNextTest':
      return {
        ...state,
        activeWordTest: state.testingArray ? state.testingArray.shift() : ''
      };
    case 'saveCurrentTestStat':
      return {
        ...state,
        statArrayCurrent: [...state.statArrayCurrent, action.payload]
      };
    case 'saveStatsData':
      return {
        ...state,
        stats: [
          ...state.stats,
          {
            result: action.payload,
            tests: state.statArrayCurrent
          }
        ]
      };
    default:
      return state;
  }
}

export const store = createStore(countUpReducer, initialState);
