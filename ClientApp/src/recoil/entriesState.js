import { atom } from 'recoil';

export const entriesState = atom({
    key: 'entriesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });