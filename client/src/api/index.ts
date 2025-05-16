import request from './network';

// 登录请求参数类型
interface LoginParams {
  username: string;
  password: string;
  captcha?: string; // 可选验证码字段
}

// 登录响应数据结构
interface LoginResponse {
  token: string;
  refreshToken: string;
  userId: number;
}

export const register = (params: LoginParams) => {
  return request.post('/api/Account/register', params);
};
export const login = (params: LoginParams) => {
  return request.post('/api/Account/login', params);
};
export const getCharacterList = () => {
  return request.get('/api/Character/list', {});
};
export const addCharacter = () => {
  return request.post('/api/Character/add', {});
};

