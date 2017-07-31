import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';
import { combineReducers } from 'redux'
import reducer from './reducer';
import learningOutcomes from './learningOutcomesReducer';

export default combineReducers({
  reducer,
  learningOutcomes
},defaultData)
