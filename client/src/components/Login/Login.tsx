import React, { useEffect } from 'react';
import style from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from '@arco-design/web-react';
import { state, setUserInfo, setToken } from '../../store';
import { register, login } from '../../api/index';
import { useSignalRContext } from '../../context/signalRContext';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [hasAccount, setHasAccount] = React.useState(false); //是否注册过
  const { connection, on, send } = useSignalRContext();
  const [errors, setErrors] = React.useState({
    userName: '',
    password: '',
  });
  // Sample - need to update
  useEffect(() => {
    // 注册消息接收事件
    const unsubscribe = on('ReceiveMessage', (user, message) => {
      console.log('user:', user, ' message: ', message);
    });

    // 组件卸载时取消注册
    return unsubscribe;
  }, [on]);

  const onRegister = async (params: any) => {
    delete params.confirm_password;
    const res = await register(params);
    if (res) {
      setToken(res.data.token);
      navigate('/roleSelect');
    }
  };
  const onLogin = async (params: any) => {
    const res = await login(params);
    if (res) {
      setToken(res.data.token);
      navigate('/roleSelect');
    }
  };
  const validateUsername = (userName: any) => {
    if (!userName) return '账号不能为空';
    if (userName.length < 8 || userName.length > 16) return '账号长度需为8-16个字符';
    if (!/^[a-zA-Z0-9]+$/.test(userName)) return '账号只能包含字母和数字';
    return '';
  };

  const validatePassword = (password: any) => {
    if (!password) return '密码不能为空';
    if (password.length < 8 || password.length > 32) return '密码长度需为8-32个字符';
    if (!/^[a-zA-Z0-9!@#$%^&*]{8,32}$/.test(password)) return '密码只能包含字母、数字和!@#$%^&*符号';
    return '';
  };
  return (
    <div className={style['login-box']}>
      <div className="text-2xl font-medium">欢迎{hasAccount ? '登录' : '注册'}艾姆艾姆欧放置</div>
      <div className="text-sm font-normal text-[var(--sub-font-color)] mt-[10px]">游戏版本 V0.0.1</div>

      <Form
        requiredSymbol={false}
        form={form}
        layout={'vertical'}
        style={{ width: 452 }}
        autoComplete="off"
        onValuesChange={(v, vs) => {
        }}
        onSubmit={v => {
          console.log('login', v);
          const userNameError = validateUsername(v.userName);
          const passwordError = validatePassword(v.password);
          if (userNameError || passwordError) {
            setErrors({
              userName: userNameError,
              password: passwordError,
            });
          } else {
            if (hasAccount) {
              onLogin(v);
            } else {
              onRegister(v);
            }
          }
        }}>
        <FormItem label="账号" field="userName">
          <Input maxLength={16} className={style.input} placeholder="请输入账号" />
        </FormItem>
        {errors.userName && <div className="text-[var(--danger-color)] mb-[20px]">{errors.userName}</div>}
        <FormItem label="密码" field="password">
          <Input maxLength={32} className={style.input} placeholder="请输入密码" />
        </FormItem>
        {errors.password && <div className="text-[var(--danger-color)] mb-[20px]">{errors.password}</div>}
        {!hasAccount && (
          <FormItem
            label="确认密码"
            field="confirm_password"
            dependencies={['password']}
            rules={[
              {
                validator: (v, cb) => {
                  if (!v) {
                    return cb('确认密码必填');
                  } else if (form.getFieldValue('password') !== v) {
                    return cb('确认密码必须和密码一致');
                  }
                  cb(null);
                },
              },
            ]}>
            <Input className={style.input} maxLength={32} placeholder="请输入确认密码" />
          </FormItem>
        )}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            long
            style={{ marginTop: 20, height: 48, color: 'var(--active-color)', backgroundColor: 'var(--sub-bg-color)' }}>
            {hasAccount ? '登录游戏' : '注册账号'}
          </Button>
        </FormItem>
      </Form>
      <div style={{ color: 'var(--sub-font-color)' }}>
        {hasAccount ? '未有账号?' : '已有账号!'}
        <Button
          type="text"
          style={{ color: 'var(--active-color)' }}
          onClick={() => {
            setHasAccount(!hasAccount);
          }}>
          {hasAccount ? '立即注册' : '直接登录'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
