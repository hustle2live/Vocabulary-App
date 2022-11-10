import { dictionary } from '../components/dictionary';

export const initialState = {
  vocabulary: [...dictionary],
  activeWordTest: '',
  count: 0,
  testingArray: [],
  statArrayCurrent: [],
  stats: ''
};
