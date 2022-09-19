//this object records the participant data
import { causalShape } from './randomizedParameters';
const Data = {
  //the participant's Prolific ID
  prolificId: [],
  // the experimental condition
  condition: [causalShape],
  //the main DV: the participant's answers to the causal questions
  responses: [],
  //the free-form comment about how people made their guesses
  freeComment: [],
  //the answers to demographic questions
  demographics: []
};

export default Data;