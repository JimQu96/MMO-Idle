import { proxy } from 'valtio';
const initalState = {
  userInfo: {} as any,
  currentPath: '',
  isArrow: true,
  labelId: 0,
  token: '',
};
export const setToken = (token: string) => {
    state.token = token;
    localStorage.setItem('token', token);
  };
export const setUserInfo = (userInfo: any) => {
  state.userInfo = userInfo;
};
export const state = proxy({ ...initalState });
