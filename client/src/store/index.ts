import { proxy } from 'valtio';
import { CharacterDetails } from '../models/CharacterDetails';
const initalState = {
  userInfo: {} as CharacterDetails,
  currentPath: '',
  isArrow: true,
  labelId: 0,
  token: '',
};
export const setToken = (token: string) => {
    state.token = token;
    localStorage.setItem('token', token);
  };
export const setUserInfo = (userInfo: CharacterDetails) => {
  state.userInfo = userInfo;
};
export const state = proxy({ ...initalState });
