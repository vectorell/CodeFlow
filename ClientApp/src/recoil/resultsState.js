import { atom } from 'recoil';

export const resultsState = atom({
    key: 'resultsState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });