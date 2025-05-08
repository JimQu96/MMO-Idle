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
    return request.post<LoginResponse>('/api/Account/register', params);
  };
export const login = (params: LoginParams) => {
    return request.post<LoginResponse>('/api/Account/login', params);
  };
  
  